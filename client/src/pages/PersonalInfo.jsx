import React from "react";
import Profile from "../components/Profile";
import { useAuthContext } from "../context/authContext";
import { FilePenLine } from "lucide-react";

function PersonalInfo() {
  const { user, firstnameUppercase, lastnameUppercase } = useAuthContext();
  return (
    <div>
      <Profile />
      <div className="ml-96 mr-96 mt-20">
        <div className=" flex items-center gap-16">
          {" "}
          <div className=" w-28 h-28 rounded-full bg-gray-300"></div>
          <label>
            <FilePenLine className=" cursor-pointer" />
            <input className="hidden" name="profilePicture" type="file" />
          </label>
          <div className=" flex flex-col">
            <span className=" text-lg font-bold">
              {firstnameUppercase} {lastnameUppercase}
            </span>
            <span className=""> Email: {user?.email} </span>
            {user?.address?.phone ? (
              <span className=" "> Phone number: {user?.address?.phone} </span>
            ) : (
              <span className=" "> Phone number:</span>
            )}
          </div>
        </div>
        <div className="">
          {user?.favourites} 
          </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
