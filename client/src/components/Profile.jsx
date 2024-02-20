import React from 'react'
import { Link } from "react-router-dom";
import { useAuthContext } from '../context/authContext';

function Profile() {
    const {} = useAuthContext()
  return (
    <div className=" ml-96 mr-96 mt-20 ">
    <h1 className=" text-6xl font-extrabold font-serif">Profile</h1>
    <div className=" mt-5  mb-3 flex items-center gap-10">
      {" "}
      <span className=" text-xl"> <Link  to="/personal-info">Personal info</Link></span>
      <span className=" text-xl"> <Link  to="/payment">Payment method</Link></span>
      <span className=" text-xl"> <Link to="/address">Address</Link></span>
      <span className=" text-xl"> <Link to="/orders">Order history</Link></span>
    </div>
   
  </div>  )
}

export default Profile