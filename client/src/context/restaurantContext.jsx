import axios from "../config/axios.js";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./authContext.jsx";

export const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [restaurants, setRestaurants] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [userOrders, setUserOrders] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [count, setCount] = useState(0);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  //fetch the restaurants by category

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

  //function to filter by category

  const handleRestaurantsCategory = (category) => {
    fetchRestaurants(category);
  };

  const handleResetCategoryClick = () => {
    fetchRestaurants();
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  //add new rating
  const addNewRating = async (userId, restaurantId, ratingNumber, comment) => {
    try {
      const response = await axios.post(baseURL + `/ratings/addnew`, {
        userId,
        restaurantId,
        ratingNumber,
        comment,
      });
      if (response.data.success) {
        setRatings(
          ratings
            ? [...ratings, response.data.newRating]
            : [response.data.newRating]
        );
        navigate("/");
        console.log("ratings for this restaurant====>", ratings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get the ratings for a specific restaurant
  const getRatingsForRestaurant = async (restaurantId) => {
    try {
      const response = await axios.get(
        baseURL + `/ratings/getforrestaurant/${restaurantId}`
      );
      if (response.data.success) {
        setRatings(response.data.ratings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //add new order
  const placeNewOrder = async (userId, restaurantId, menuId) => {
    try {
      const response = await axios.post(baseURL + `/orders/addnew`, {
        userId,
        restaurantId,
        menuId,
      });
      if (response.data.success) {
        alert("Order placed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch users order history
  const userOrderhistory = async (userId) => {
    try {
      const response = await axios.get(
        baseURL + `/orders/getforuser/${userId}`
      );
      if (response.data.success) {
        //console.log("Orders==>>", response.data.orders);
        setUserOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //find restaurant by id
  const findRestaurant = async (restaurantId) => {
    try {
      const response = await axios.get(
        baseURL + `/restaurants/find/${restaurantId}`
      );
      if (response.data.success) {
        //console.log("Orders==>>", response.data.orders);
        setRestaurant(response.data.restaurant);
        navigate("/description");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add new order
  const AddOrder = async (userId, restaurantId, menuIds) => {
    try {
      const body = {
        userId,
        restaurantId,
        menuIds,
      };

      const newOrder = await axios.post(baseURL + "/orders/addnew", body);
      console.log(newOrder);
      setMenu((prevOrders) => [...prevOrders, newOrder.data]);
      console.log(newOrder.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        ratings,
        userOrders,
        restaurant,
        fetchRestaurants,
        getRatingsForRestaurant,
        addNewRating,
        placeNewOrder,
        userOrderhistory,
        handleRestaurantsCategory,
        handleResetCategoryClick,
        findRestaurant,
        AddOrder,
        setUserOrders,
        setMenu,
        menu,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
