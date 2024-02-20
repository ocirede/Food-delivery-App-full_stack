import React from 'react'
import { Link } from "react-router-dom";
import { useAuthContext } from '../context/authContext';

function Profile() {
    const {handleHrLineDarker, darkerLine } = useAuthContext()
  return (
    <div className=" ml-96 mr-96 mt-20 ">
    <h1 className=" text-6xl font-extrabold font-serif">Profile</h1>
    <div className=" mt-5  mb-3 flex items-center gap-10">
      {" "}
      <span className=" text-xl"> <Link onClick={handleHrLineDarker}  to="/personal-info">Personal info</Link></span>
      <span className=" text-xl"> <Link onClick={handleHrLineDarker}>Payment method</Link></span>
      <span className=" text-xl"> <Link>Address</Link></span>
      <span className=" text-xl"> <Link>Order history</Link></span>
    </div>
    {darkerLine ? (
        <hr className=' w-32 border-zinc-950'/>
    ) : ( <hr />)}
   
  </div>  )
}

export default Profile