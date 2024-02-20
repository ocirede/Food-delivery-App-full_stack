import React, { useState } from "react";
import Profile from "../components/Profile";
import Payment from "../components/Payment";
import { useAuthContext } from "../context/authContext";

function PaymentMethod() {
  return (
    <div>
      <Profile />
      <Payment />
     
    </div>
  );
}

export default PaymentMethod;
