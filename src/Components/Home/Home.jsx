import React, { useEffect } from "react";
import Base from "../Base/Base";
import styles from "./home.module.css";
import { useCommonContext } from "../../StateManagement/ContextApi";
import { CircularProgress } from "@mui/material";
import Product from "../Products/Products";

const Home = () => {
  const { getProducts, getOrders, data, loading, setLoading } =
    useCommonContext();
  console.log(data);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      {loading.productLoading ? (
        <div className={styles.progress}>
          <CircularProgress sx={{ color: "black" }} />
        </div>
      ) : (
        <Base>
          <header className={styles.header}>
            <img
              src="https://wallpapers.com/images/hd/e-commerce-1920-x-1080-wallpaper-tb4uqckgoo0883zw.jpg"
              alt="Image"
            />
          </header>
          <Product/>
        </Base>
      )}
    </div>
  );
};

export default Home;
