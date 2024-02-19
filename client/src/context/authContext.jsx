import React from "react";
import axios from "../config/axios.js";
import { baseURL } from "../config/api.js";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const handleRegister = async (e) => {
    e.preventDefault();
    const body = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
    confirmpassword: e.target.confirmpassword.value
    };

    const response = await axios.post(baseURL + "/users/register/", body)
    console.log(response);
  };

  const values = { handleRegister };

  return (
    <AuthContext.Provider value={{ values }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
