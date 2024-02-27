import React, { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { Heart } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import MenuItemCard from "../components/MenuItemCard";
import { useLocation } from "react-router-dom";

function DescriptionPage() {
  const { restaurant, findRestaurant } = useContext(RestaurantContext);
  const { user, handleFavourites } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const restaurantId = queryParams.get("restaurantId");

  useEffect(() => {
    findRestaurant(restaurantId);
  }, [restaurantId]);

  useEffect(() => {
    setIsFavorite(
      user?.favourites.map((item) => item._id).includes(restaurantId) ||
        user?.favourites.includes(restaurantId)
    );
  }, [user]);

  return (
    <div className=" flex flex-col justify-center  ml-5  mt-6">
      <h2 className=" text-6xl font-bold">{restaurant?.name}</h2>
      <div className=" flex gap-5 text-lg font-bold mt-5 ">
        <p> {restaurant?.category} cuisine</p>
        <div className=" flex justify-center items-center gap-3  ">
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
            {isFavorite ? <Heart style={{ fill: "red" }} /> : <Heart />}
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
        <div className="px-6 py-4 mt-1  grid grid-cols-3  gap-6">
          {restaurant?.menu.map((item) => (
            <MenuItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
      <hr className=" mt-20 border-black" />

      <div className=" ml-5 flex justify-center  items-center mt-36 gap-40">
        <div className=" w-1/3 flex gap-20 ">
          <p>{restaurant?.info}</p>
        </div>
        <div className=" w-1/3 text-lg  flex gap-20">
          <div className=" flex flex-col">
            {/* <h3 className=" font-semibold">Address:</h3>
            <p>Street: {restaurant?.address.street}</p>
            <p>
              City: {restaurant?.address.city} {restaurant?.address.postalCode}
            </p>
            <p>Country: {restaurant?.address.country}</p> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.384209086383!2d-118.24111842318315!3d33.95696297319333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c96fa4433035%3A0x2aebe07feee6cff7!2sElm%20St%2C%20Los%20Angeles%2C%20CA%2090001%2C%20USA!5e0!3m2!1sen!2sde!4v1709033509902!5m2!1sen!2sde"
              width="600"
              height="450"
              style={{border:0}}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            >
              {" "}
              See map
            </iframe>
          </div>
        </div>
        <div className=" w-1/3 text-lg gap-20 flex">
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
