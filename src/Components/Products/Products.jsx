import React from "react";
import styles from "./product.module.css";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCommonContext } from "../../StateManagement/ContextApi";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Product = () => {
  const { data } = useCommonContext();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {data.products?.map((item, idx) => {
        const content =
          item.offer?.type === "flat"
            ? `Flat ${item.offer.flatDiscount} off`
            : item.offer?.type === "percentage"
            ? `${item.offer.percentageDiscount}% off`
            : "Bundled Offer";

        return (
          <Card
            key={idx}
            className={styles.productCard}
            sx={{
              boxShadow: "0 0 10px black",
              backgroundColor: "rgb(230, 230, 230)",
            }}
          >
            {item.offeredPrice && (
              <Badge
                badgeContent={content}
                color="secondary"
                sx={{ position: "absolute", width: "110px" }}
              ></Badge>
            )}
            <CardMedia
              component="img"
              className={styles.image}
              image={item.imageUrl}
              alt={item.name}
              sx={{cursor:"pointer"}}
                    onClick={()=>navigate(`/singleproduct/${item._id}`)}
            />

            <CardContent>
              <div className={styles.productName}>{item.name}</div>
              <div>
                {item.offeredPrice ? (
                  <div>
                    <div
                      style={{ textDecoration: "line-through" }}
                      className={styles.productPrice}
                      variant="body1"
                    >
                      <CurrencyRupeeIcon fontSize="10px" />
                      {item.offer.type === "bundled"
                        ? (
                            item.price + item.offer.bundledProduct.price
                          ).toFixed(2)
                        : item.price.toFixed(2)}
                    </div>
                    <div className={styles.productPrice} variant="body1">
                      <CurrencyRupeeIcon fontSize="10px" />
                      {item.offeredPrice.toFixed(2)}
                    </div>
                  </div>
                ) : (
                  <div className={styles.productPrice} variant="body1">
                    <CurrencyRupeeIcon fontSize="10px" />
                    {item.price.toFixed(2)}{" "}
                  </div>
                )}
              </div>
            </CardContent>
            <Typography
              component="div"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "black" }}
                className={styles.button}
                onClick={() => navigate(`/singleproduct/${item._id}`)}
              >
                VIEW
              </Button>
            </Typography>
          </Card>
        );
      })}
    </div>
  );
};

export default Product;
