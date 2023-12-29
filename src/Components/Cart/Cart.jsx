import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import styles from "./cart.module.css";
import { useCommonContext } from "../../StateManagement/ContextApi";
import Base from "../Base/Base";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartComponent = () => {
  const { getOrders, data, loading, setLoading } = useCommonContext();
  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, []);
  console.log(data);

  const handleIncrement = async (productId) => {
    try {
      setLoading((prev) => ({
        ...prev,
        orderLoading: true,
      }));
      const response = await axios.put(
        `https://growxcd-backend.onrender.com/orders/${productId}/updatequantity`,
        {
          quantity: 1,
        }
      );

      console.log("Increment response:", response.data);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    } finally {
      getOrders();
    }
  };

  const handleDecrement = async (productId) => {
    try {
      setLoading((prev) => ({
        ...prev,
        orderLoading: true,
      }));
      const response = await axios.put(
        `https://growxcd-backend.onrender.com/orders/${productId}/updatequantity`,
        {
          quantity: -1,
        }
      );
      console.log("Decrement response:", response.data);
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    } finally {
      getOrders();
    }
  };
  return (
    <Base>
      {loading.orderLoading ? (
        <div className={styles.progress}>
          <CircularProgress sx={{ color: "black" }} />
        </div>
      ) : (
        <div className={styles.ordersContainer}>
          <Card className={styles.cardContainer}>
            {data.orders.orders.map((order, index) => {
              const content =
                order.product.offer.type === "flat"
                  ? `Flat ${order.product.offer.flatDiscount} off`
                  : order.product.offer?.type === "percentage"
                  ? `${order.product.offer.percentageDiscount}% off`
                  : "Bundled Offer";

              return (
                <Card className={styles.card} key={order._id}>
                  {order.product.offeredPrice && (
                    <Badge
                      badgeContent={content}
                      color="secondary"
                      sx={{ position: "absolute", width: "110px" }}
                    ></Badge>
                  )}
                  <CardMedia
                    component="img"
                    className={styles.image}
                    image={order.product.imageUrl}
                    alt={order.name}
                  />
                  <Typography
                    className={styles.productName}
                    sx={{ fontSize: "smaller", fontWeight: "bold" }}
                    component="div"
                  >
                    {order.product.name}
                  </Typography>
                  <Typography
                    className={styles.quantity}
                    sx={{ fontSize: "smaller", fontWeight: "bold" }}
                    component="div"
                  >
                    Quantity: {order.quantity}
                  </Typography>
                  <div className={styles.buttonContainer}>
                    <IconButton onClick={() => handleIncrement(order._id)}>
                      <AddIcon color="primary" />
                    </IconButton>
                    <IconButton color="primary">{order.quantity}</IconButton>
                    <IconButton
                      onClick={() => {
                        order.quantity > 1 && handleDecrement(order._id);
                      }}
                    >
                      <RemoveIcon color="primary" />
                    </IconButton>
                  </div>
                  <Typography
                    component="div"
                    className={styles.price}
                    sx={{ fontWeight: "bold", fontSize: "smaller" }}
                  >
                    Total Price: {order.originalPrice}
                  </Typography>
                </Card>
              );
            })}
          </Card>
          <Card style={{ display: "flex", justifyContent: "center" }}>
            <Card className={styles.totalCard}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  textAlign="center"
                  paddingBottom="20px"
                >
                  Total Orders Information
                </Typography>
                <Typography
                  component="div"
                  sx={{ fontSize: "smaller", fontWeight: "bold" }}
                >
                  Total Orders: {data.orders.totalOrders}
                </Typography>
                <Typography
                  component="div"
                  sx={{ fontSize: "smaller", fontWeight: "bold" }}
                >
                  Total Original Price:{" "}
                  <span style={{ textDecoration: "line-through" }}>
                    {data.orders.totalOriginalPrice}
                  </span>
                </Typography>
                <Typography
                  component="div"
                  sx={{ fontSize: "smaller", fontWeight: "bold" }}
                >
                  Total Discounted Price: {data.orders.totalDiscountedPrice}
                </Typography>
                <Typography
                  component="div"
                  sx={{ fontSize: "smaller", fontWeight: "bold" }}
                >
                  Total Price: {data.orders.totalOfferedPrice}
                </Typography>
              </CardContent>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" sx={{ backgroundColor: "black" }}>
                  Buy now
                </Button>
              </div>
            </Card>
          </Card>
        </div>
      )}
    </Base>
  );
};

export default CartComponent;
