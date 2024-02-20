import axios from "../config/axios.js";
import { baseURL } from "../config/api.js";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(null);

  const navigate = useNavigate();

  const fetchRestaurants = async (category = "") => {
    try {
      const response = await axios.get(
        baseURL + `/restaurants/getall?category=${category}`
      );
      if (response.data.success) {
        setRestaurants(response.data.restaurants);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, fetchRestaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
