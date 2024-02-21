import React from "react";
import axios from "../config/axios.js";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [card, setCard] = useState([]);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const firstnameUppercase = user?.address?.firstname
    ? user.address.firstname.split(" ")[0].charAt(0).toUpperCase() +
      user.address.firstname.slice(1)
    : "";
  const lastnameUppercase = user?.address?.lastname
    ? user.address.lastname.split(" ")[0].charAt(0).toUpperCase() +
      user.address.lastname.slice(1)
    : "";

  //fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(baseURL + "/users/loggeduser");
          setUser(response.data.user);
          console.log("fetchedUser =====>", response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  //fetch card
  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(
            `${baseURL}/cards/getcard/${user._id}`
          );
          console.log("card data", response.data);
          setCard(response.data.card);
        } else {
          console.log("User or user._id is undefined");
        }
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    fetchCard();
  }, []);

  // registration user
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors(null);
    try {
      const body = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmpassword: e.target.confirmpassword.value,
      };
      const response = await axios.post(baseURL + "/users/register/", body);
      e.target.reset();
      navigate("signin");
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.message);
    }
  };

  //login user
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors(null);

    try {
      const body = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const response = await axios.post(baseURL + "/users/signin", body);
      localStorage.setItem("token", response.data.token);
      console.log(response);
      e.target.reset();
      setUser(response.data);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.message);
    }
  };

  // add payment method
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const card = {
      number: e.target.number.value,
      expiry: e.target.expiry.value,
      cvv: e.target.cvv.value,
      cardholder: e.target.cardholder.value,
    };
    try {
      const { data: newCard } = await axios.post(
        baseURL + `/cards/addnew/${user._id}`,
        card
      );
      e.target.reset();
      setCard(newCard.newCard);
    } catch (err) {
      console.log(err);
    }
  };

  // // uodate image
  const handleUpdateImage = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    console.log(formdata);
    try {
      const { data: updatedProfile } = await axios.put(
        baseURL + `/users/update/${user._id}`,
        formdata
      );
      e.target.reset();
      if (updatedProfile.success) {
        setUser(updatedProfile.user);
        console.log(updatedProfile);
      }
      console.log(updatedProfile);
    } catch (err) {
      console.log(err);
    }
  };

  // update  address
  const handleUpdateAddress = async (e) => {
    e.preventDefault();

    const body = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      street: e.target.street.value,
      postalCode: e.target.postalcode.value,
      country: e.target.country.value,
      phone: e.target.phone.value,
    };

    try {
      const { data: updatedAddress } = await axios.put(
        baseURL + `/users/updateaddress/${user._id}`,
        body
      );
      console.log(body);
      e.target.reset();
      if (updatedAddress.success) {
        setUser(updatedAddress.user);
      }
      console.log(updatedAddress);
    } catch (err) {
      console.log(err);
    }
  };

  // logout
  const handeLogout = () => {
    localStorage.removeItem("token");
  };

  //add fav
  const handleFavourites = async (restaurantId, userId) => {
    const body = {
      userId,
    };

    try {
      const response = await axios.put(
        baseURL + `/users/favourite/${restaurantId}`,
        body
      );

      setUser(response.data.user);
      console.log("===> add fav", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleRegister,
        handleLogin,
        errors,
        user,
        firstnameUppercase,
        lastnameUppercase,
        handeLogout,
        handleUpdateImage,
        handlePaymentSubmit,
        handleUpdateAddress,
        card,
        handleFavourites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
