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
import styles from "./cart.module.css";
import { useCommonContext } from "../../StateManagement/ContextApi";
import Base from "../Base/Base";

// ... (previous imports)

const CartComponent = () => {
    const { getOrders, data, loading } = useCommonContext();
    const navigate = useNavigate();
  
    useEffect(() => {
      getOrders();
    }, []);
  
    const handleIncrement = (index) => {
      // Logic to increment order quantity
      // Update data and trigger necessary state updates
    };
  
    const handleDecrement = (index) => {
      // Logic to decrement order quantity
      // Update data and trigger necessary state updates
    };
  
    return (
      <Base>
        {loading.orderLoading ? (
          <div className={styles.progress}>
            <CircularProgress sx={{ color: "black" }} />
          </div>
        ) : (
          <div className={styles.ordersContainer}>
            {data.orders.orders.map((order, index) => (
              <Card className={styles.card} key={order._id}>
                <CardMedia
              component="img"
              className={styles.image}
              image={order.imageUrl}
              alt={order.name}
            />
                <CardContent className={styles.leftSection}>
                  <Typography gutterBottom variant="h5" component="div">
                    {order.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {order.quantity}
                  </Typography>
                </CardContent>
                <CardContent className={styles.rightSection}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Total Price: {order.totalPrice}
                  </Typography>
                  <div className={styles.buttonContainer}>
                    <Button onClick={() => handleIncrement(index)}>+</Button>
                    <Button onClick={() => handleDecrement(index)}>-</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Base>
    );
  };
  
  export default CartComponent;
  
