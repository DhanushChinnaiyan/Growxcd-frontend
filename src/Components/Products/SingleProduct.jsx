import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import styles from "./product.module.css";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigate = useNavigate();

  // Getting single product
  const getSingleProduct = async () => {
    try {
      setProductLoading(true);
      const response = await axios.get(
        `https://growxcd-backend.onrender.com/api/products?productId=${productId}`
      );
      const data = response.data[0];

      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    } finally {
      setProductLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setFetchLoading(true);
      await axios.post(
        `https://growxcd-backend.onrender.com/orders?productId=${productId}`
      );
      navigate("/carts");
    } catch (error) {
      console.error("Error adding cart:", error.message);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.delete(
        `https://growxcd-backend.onrender.com/orders/delete?productId=${productId}`
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error removing cart:", error.message);
    } finally {
      setFetchLoading(false);
      getSingleProduct();
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <div>
      {productLoading ? (
        <div className={styles.progress}>
          <CircularProgress sx={{ color: "black" }} />
        </div>
      ) : (
        <Card className={styles.Card}>
          {/* Products details */}
          <CardMedia
            component="img"
            className={styles.CardMedia}
            image={product?.imageUrl}
            alt={product?.name}
          />
          <CardContent className={styles.productDetails}>
            <Typography gutterBottom variant="h5" component="div">
              {product?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product?.description}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Price: {product?.price}
            </Typography>
            {product?.inCart ? (
              <Button
                disabled={fetchLoading}
                variant="contained"
                sx={{ backgroundColor: "black" }}
                onClick={handleRemoveFromCart}
              >
                {fetchLoading ? (
                  <CircularProgress size="30px" color="secondary" />
                ) : (
                  "Remove from cart"
                )}
              </Button>
            ) : (
              <Button
                disabled={fetchLoading}
                variant="contained"
                sx={{ backgroundColor: "black" }}
                onClick={handleAddToCart}
              >
                {fetchLoading ? (
                  <CircularProgress size="30px" color="secondary" />
                ) : (
                  "Add to cart"
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SingleProduct;
