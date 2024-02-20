import React from "react";
import axios from "../config/axios.js";
import { baseURL } from "../config/api.js";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [ card, setCard] = useState([])
  const navigate = useNavigate();

  const firstnameUppercase = user?.address?.firstname
    ? user.address.firstname.split(" ")[0].charAt(0).toUpperCase() +
      user.address.firstname.slice(1)
    : "";
  const lastnameUppercase = user?.address?.lastname
    ? user.address.lastname.split(" ")[0].charAt(0).toUpperCase() +
      user.address.lastname.slice(1)
    : "";

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      const response = await axios.get(baseURL + "/users/loggeduser");
      setUser(response.data.user);
      console.log("fetchedUser =====>", response.data);
    } else {
      // navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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

 
const handlePaymentSubmit = (e) => {
e.preventDefault();
const card = {
  number: e.target.cardnumber.value,
  expiry: e.target.expiry.value,
  ccv: e.target.ccv.value,
  cardholder: e.target.cardholder.value
};
e.target.reset()
setCard(card);
console.log("====> card",card)
}
  
 

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    try {
      const { data: updatedProfile } = await axios.put(
        baseURL + `/users/update/${user._id}`,
        formdata
      );
      e.target.reset();
      if (updatedProfile.success) {
        setUser(updatedProfile.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handeLogout = () => {
    localStorage.removeItem("token");
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
        handleUpdateProfile,
        handlePaymentSubmit,
        card
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
