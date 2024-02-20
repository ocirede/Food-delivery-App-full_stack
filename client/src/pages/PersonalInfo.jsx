import React from "react";
import Profile from "../components/Profile";
import { useAuthContext } from "../context/authContext";
import { FilePenLine, Send } from "lucide-react";
import { baseURL } from "../config/api";

function PersonalInfo() {
  const { user, firstnameUppercase, lastnameUppercase, handleUpdateImage } =
    useAuthContext();
  return (
    <div>
      <Profile />
      <div className="ml-96 mr-96 mt-20">
        <form
          onSubmit={handleUpdateImage}
          className=" flex items-center gap-16"
        >
          {" "}
          {user?.image ? (
            <img
              src={baseURL + "/uploads/profileImage/" + user?.image}
              className="w-28 h-28 bg-gray-300 object-cover"
              alt="Profile img"
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <div className=" w-28 h-28 rounded-full bg-gray-300"></div>
          )}
          <label>
            <FilePenLine className=" cursor-pointer" />
            <input className="hidden" name="profileImage" type="file" />
          </label>
          <button type="submit">
            <Send />
          </button>
          {user?.address ? (
            <div className=" flex flex-col  gap-2">
              <span className=" text-lg font-bold">
                {firstnameUppercase} {lastnameUppercase}
              </span>

              <span className=""> Email: {user?.email} </span>
              <span className=" "> Phone number: {user?.address?.phone} </span>
            </div>
          ) : (
            <div className=" flex flex-col  gap-2">
              <span className=" text-lg font-bold">
                {user?.username} please add your personal infos in the address
                section
              </span>

              <span className=""> Email: {user?.email} </span>
              <span className=" "> Phone number:</span>
            </div>
          )}
        </form>
        {/* <div className="">
          {user?.favourites} 
          </div> */}
      </div>
    </div>
  );
}

export default PersonalInfo;
