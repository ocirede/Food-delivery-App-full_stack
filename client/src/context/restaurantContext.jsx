import axios from "../config/axios.js";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config/api.js";

export const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [placedOrders, setPlacedOrders] = useState(null);
  const [favourite, setFavourite] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  const navigate = useNavigate();

  // fetching: all restaurants, rating for a restaurant,
  useEffect(() => {
    fetchRestaurants();
    //getRatingsForRestaurant(restaurants?._id);
  }, []);

  //fetch the restaurants by category

  const fetchRestaurants = async (category = "") => {
    try {
      const response = await axios.get(
        baseURL + `/restaurants/getall?category=${category}`
      );
      if (response.data.success) {
        setRestaurants(response.data.restaurants);
        const favorites = JSON.parse(localStorage.getItem("favourites"));
        setFavourite(favorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function to filter by category

  const handleRestaurantsCategory = (category) => {
    fetchRestaurants(category);
  };

  //function to reset filter by category
  const handleResetCategoryClick = () => {
    fetchRestaurants();
  };

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
  const placeNewOrder = async (userId, restaurantId, menuItems) => {
    try {
      const body = {
        userId,
        restaurantId,
        menuItems,
      };

      const newOrder = await axios.post(baseURL + "/orders/addnew", body);

      setPlacedOrders(newOrder.data);
      setUserOrders([]);
      navigate("/checkout");
      console.log(newOrder.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Increment order quantity
  const handleIncrement = (itemId) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1,
    }));
    setUserOrders((previousOrders) => {
      const existingOrderItem = previousOrders.find(
        (item) => item.itemId === itemId
      );

      if (existingOrderItem) {
        return previousOrders.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...previousOrders, { itemId, quantity: 1 }];
      }
    });
  };

  // decrement order quantity
  const handleDecrement = (itemId) => {
    if (itemCounts[itemId] && itemCounts[itemId] > 0) {
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [itemId]: prevCounts[itemId] - 1,
      }));
      setUserOrders((previousOrders) => {
        const updaredOrders = previousOrders.map((item) =>
          itemId === item.itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        const filteredOrders = updaredOrders.filter(
          (item) => item.quantity > 0
        );
        return filteredOrders;
      });
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        ratings,
        userOrders,
        restaurant,
        itemCounts,
        userOrders,
        placedOrders,
        favourite,
        fetchRestaurants,
        getRatingsForRestaurant,
        addNewRating,
        placeNewOrder,
        userOrderhistory,
        handleRestaurantsCategory,
        handleResetCategoryClick,
        findRestaurant,
        setUserOrders,
        setPlacedOrders,
        handleIncrement,
        handleDecrement,
        setItemCounts,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
