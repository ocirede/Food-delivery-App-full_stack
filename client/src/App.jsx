import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import MainLayout from "./layout/MainLayout";
import HomaPage from "./pages/HomaPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthProvider from "./context/authContext";
import ProfilePage from "./pages/ProfilePage";
import PersonalInfo from "./pages/PersonalInfo";
import PaymentMethod from "./pages/PaymentMethod";
import AddressPage from "./pages/AddressPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<HomaPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/personal-info" element={<PersonalInfo/>}/>
              <Route path="/payment" element={<PaymentMethod/>}/>
              <Route path="/address" element={<AddressPage/>}/>

            </Route>

              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
