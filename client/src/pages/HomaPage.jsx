import React, { useState, useContext } from "react";

import { RestaurantContext } from "../context/restaurantContext";
import { useAuthContext } from "../context/authContext";
import SubNav from "../components/SubNav";
import ShowRatings from "../components/ShowRatings";

function HomaPage() {
  const { restaurants, findRestaurant, ratings, getRatingsForRestaurant } =
    useContext(RestaurantContext);
  const {user } = useAuthContext();

  const [showRatings, setShowRatings] = useState(false);

  const handleViewRatings = (restaurantId) => {
    getRatingsForRestaurant(restaurantId);
    console.log("ratings==>", ratings);
    setShowRatings(true);
  };

  return (
    <>
      <SubNav />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-4">Restaurants</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurants?.map((restaurant, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div>
                <div>
                  <img src={restaurant?.image} alt="" />
                </div>
                <div className="flex justify-between">
                  <button onClick={() => findRestaurant(restaurant._id)}>
                    <h2 className="text-xl font-semibold mb-2 underline">
                      {restaurant.name}
                    </h2>
                  </button>

             
                </div>

                <p className="text-gray-600">{restaurant.description}</p>
                <div className="mt-4 flex flex-col justify-between gap-2">
                  <span className="text-gray-500 flex gap-3 ">
                    Rating:{" "}
                    <div className="flex items-center">
                      <svg
                        className={`w-7 h-7 text-yellow-500 flex justify-center`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 25 25"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {restaurant.averageRating
                        ? restaurant.averageRating.toFixed(2)
                        : "N/A"}
                    </div>
                  </span>
                </div>

                <button
                  onClick={() => handleViewRatings(restaurant._id)}
                  className="mt-4 text-blue-500 hover:text-blue-700 font-bold underline px-0 rounded"
                  style={{ background: "none", border: "none" }}
                >
                  View Ratings
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showRatings && (
        <ShowRatings ratings={ratings} setShowRatings={setShowRatings} />
      )}
    </>
  );
}

export default HomaPage;
