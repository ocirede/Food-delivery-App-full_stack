import React, { useState, useContext } from "react";

import { RestaurantContext } from "../context/restaurantContext";
import { Heart } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import SubNav from "../components/SubNav";

function HomaPage() {
  const { restaurants, findRestaurant, ratings, getRatingsForRestaurant } =
    useContext(RestaurantContext);
  const { handleFavourites, user } = useAuthContext();

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
                <div className="flex justify-between">
                  <button onClick={() => findRestaurant(restaurant._id)}>
                    <h2 className="text-xl font-semibold mb-2 underline">
                      {restaurant.name}
                    </h2>
                  </button>

                  <button
                    onClick={() => handleFavourites(restaurant._id, user._id)}
                  >
                    {user?.favourites?.includes(restaurant._id) ? (
                      <Heart style={{ fill: "red" }} />
                    ) : (
                      <Heart />
                    )}
                  </button>
                </div>

                <p className="text-gray-600">{restaurant.description}</p>
                <div className="mt-4 flex flex-col justify-between gap-2">
                  <span className="text-gray-500">
                    Location: {restaurant.address.city}
                  </span>
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
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Ratings</h2>
          {/* Example content */}
          <div
            style={{
              height: "300px",
              width: "600px",
              overflowY: "auto",
              border: "grey solid 1px",
              borderRadius: "2%",
            }}
          >
            {ratings.map((rating) => (
              <div
                key={rating._id}
                className="flex items-end justify-between gap-10 p-4 border border-gray-300 rounded-lg shadow-md mb-4"
              >
                <div>
                  <p className="mr-2">
                    <b>{rating.user.username}</b>
                  </p>
                  <p className="mr-2">{rating.comment}</p>
                </div>

                <div className="flex items-center">
                  {[...Array(rating.ratingNumber)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 text-yellow-500`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1.32c-.145-.467-.82-.467-.965 0L7.38 6.363 2.12 7.65c-.51.077-.714.683-.327 1.025l4.287 3.955-1.136 5.902c-.144.747.65 1.337 1.277.906L10 15.437l4.777 2.045c.628.43 1.421-.16 1.277-.906l-1.136-5.902 4.287-3.955c.387-.342.183-.948-.327-1.025l-5.26-1.287L10 1.32z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowRatings(false)}
            className="text-red-500 hover:text-red-700 font-bold mt-4"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default HomaPage;
