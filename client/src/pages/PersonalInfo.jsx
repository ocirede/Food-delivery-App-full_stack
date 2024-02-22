import React from "react";
import Profile from "../components/Profile";
import { useAuthContext } from "../context/authContext";
import { FilePenLine, Send } from "lucide-react";
import { baseURL } from "../config/api";
import { Link } from "react-router-dom";

function PersonalInfo() {
  const { user, firstnameUppercase, lastnameUppercase, handleUpdateImage } =
    useAuthContext();
  return (
    <div>
      <Profile />
      <div className="ml-96 mr-96 mt-20">
        <form onSubmit={handleUpdateImage} className="flex items-center gap-16">
          {user?.image ? (
            <img
              src={baseURL + "/uploads/profileImage/" + user?.image}
              className="w-28 h-28 bg-gray-300 object-cover"
              alt="Profile img"
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300"></div>
          )}
          <label>
            <FilePenLine className="cursor-pointer" />
            <input className="hidden" name="profileImage" type="file" />
          </label>
          <button type="submit">
            <Send />
          </button>
          {user?.address ? (
            <>
              <div className=" flex gap-28">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold">
                    {firstnameUppercase} {lastnameUppercase}
                  </span>
                  <span>Email: {user?.email}</span>
                  <span>Phone number: {user?.address?.phone}</span>
                </div>
                <div className=" flex flex-col">
                  <h3 className=" text-lg font-bold">Address:</h3>
                  <span className=" text-lg">
                    Street: {user?.address?.street}
                  </span>
                  <span className=" text-lg">
                    Postal code: {user?.address?.postalCode}
                  </span>
                  <span className=" text-lg">City: {user?.address?.city}</span>
                  <span className=" text-lg">
                    Country: {user?.address?.country}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-lg font-bold">
                {user?.username} please add your personal infos in the{" "}
                <Link className=" text-blue-500" to="/address">
                  address
                </Link>{" "}
                section
              </span>
              <span>Email: {user?.email}</span>
              <span>Phone number:</span>
            </div>
          )}
        </form>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="bg-white p-6 rounded-lg shadow-md">
          {user?.favourites?.length === 0 ? (
            <div>
              <h3 className="text-2xl font-bold">Favourites:</h3>
              <p className="text-lg mt-2 text-gray-600">
                You’ll find your favorite restaurants here. You can add
                favorites by tapping the heart icon.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold">Favourites:</h3>
              <ul className="mt-6">
                {user?.favourites?.map((favourite, index) => (
                  <li key={index} className="mr-4 mb-2">
                    <span className="text-lg font-bold">{favourite.name}</span>
                    {index !== user.favourites.length - 1 && (
                      <span className="mx-2 border-b border-gray-400"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
