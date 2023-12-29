import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const context = createContext();
export const useCommonContext = () => useContext(context);

const ContextApi = ({ children }) => {
  const [data, setData] = useState({
    products: [],
    orders: [],
  });

  const [loading, setLoading] = useState({
    productLoading: true,
    orderLoading: true,
  });

  const getProducts = async () => {
    try {
        setLoading((prev)=>({
            ...prev,
            productLoading: true,
          }));
      const response = await axios.get(
        "https://growxcd-backend.onrender.com/api/products"
      );
      const data = response.data;
      setData((prev)=>({
        ...prev,
        products:data
      }));
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
        setLoading((prev)=>({
            ...prev,
            productLoading: false,
          }));
    }
  };

  const getOrders = async () => {
    try {
        setLoading((prev)=>({
            ...prev,
            orderLoading: true,
          }));
      const response = await axios.get(
        "https://growxcd-backend.onrender.com/orders"
      );
      const data = response.data;
      setData((prev)=>({
        ...prev,
        orders:data
      }));
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading((prev)=>({
        ...prev,
        orderLoading: false,
      }));
    }
  };

  const value = {
    getProducts,
    getOrders,
    data,
    loading,
    setLoading,
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextApi;
