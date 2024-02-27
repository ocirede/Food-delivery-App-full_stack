import React, { useContext, useState } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { Heart } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import MenuItemCard from "../components/MenuItemCard";

function DescriptionPage() {
  const { restaurant,  } = useContext(RestaurantContext);
  const { user, handleFavourites } = useAuthContext();
  console.log(restaurant);
  return (
    <div className=" flex flex-col justify-center  ml-5  mt-6">
      <h2 className=" text-6xl font-bold">{restaurant?.name}</h2>
      <div className=" flex gap-5 text-lg font-bold mt-5 ">
        <p> {restaurant?.category} cuisine</p>
        <div className=" flex justify-center items-center ">
          <svg
            className={`w-7 h-7 text-yellow-500   `}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>{" "}
          {restaurant?.averageRating ? (
            restaurant?.averageRating
          ) : (
            <p>Not review yet!!</p>
          )}
          <button onClick={() => handleFavourites(restaurant?._id, user._id)}>
            {user?.favourites?.includes(restaurant?._id) ? (
              <Heart style={{ fill: "red" }} />
            ) : (
              <Heart />
            )}
          </button>
        </div>
      </div>

      <div
        className="relative  d bg-cover bg-center bg-no-repeat  h-72"
        style={{
          backgroundImage: `url(${restaurant?.image})`,
          backgroundSize: "cover",
          objectFit: "contain",
        }}
      ></div>

      <div className=" bg-amber-100 flex flex-col mt-10">
        <h3 className="font-bold mb-2 text-4xl ml-2">Menu</h3>
        <div className="px-6 py-4 mt-5  grid grid-cols-3  gap-6">
          {restaurant?.menu.map((item) => (
            <MenuItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
      <hr className=" mt-20 border-black" />

      <div className=" ml-5 flex justify-center  items-center mt-36 gap-40">
        <div className=" w-1/2 flex gap-20 ">
          <p>{restaurant?.info}</p>
        </div>
        <div className=" w-1/4 text-lg  flex gap-20">
          <div className=" flex flex-col">
            <h3 className=" font-semibold">Address:</h3>
            <p>Street: {restaurant?.address.street}</p>
            <p>
              City: {restaurant?.address.city} {restaurant?.address.postalCode}
            </p>
            <p>Country: {restaurant?.address.country}</p>
          </div>
        </div>
        <div className=" w-1/4 text-lg gap-20 flex">
          <div className=" flex flex-col">
            <p className="font-bold">Delivery times</p>
            <p>
              <span className=" font-bold">Monday:</span> 11:30-22:00{" "}
            </p>
            <p>
              <span className=" font-bold">Tuesday:</span> 11:30-22:00{" "}
            </p>
            <p>
              <span className=" font-bold">Wednesday:</span> 11:30-22:00{" "}
            </p>
            <p>
              <span className=" font-bold">Thursday:</span> 11:30-22:00{" "}
            </p>
            <p>
              <span className=" font-bold">Friday:</span> 11:30-22:00{" "}
            </p>
            <p>
              <span className=" font-bold">Saturday:</span> 11:30-22:00{" "}
            </p>
            <p>
              <span className=" font-bold">Sunday:</span> 11:30-22:00{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionPage;
