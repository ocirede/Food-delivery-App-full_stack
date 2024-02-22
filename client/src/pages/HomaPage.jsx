import React, { useContext, useEffect } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { Heart } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import SubNav from "../components/SubNav";

function HomaPage() {
  const { restaurants, findRestaurant, ratings, getRatingsForRestaurant } =
    useContext(RestaurantContext);
  const { handleFavourites, user } = useAuthContext();
 
  const handleDescription = (restaurantId) => {
    findRestaurant(restaurantId);
  };

  return (
    <>
      <SubNav />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-4">Restaurants</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurants?.map((restaurant, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              {/* <img
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-full h-48 object-cover rounded-t-lg"
            /> */}
              <div className="p-4">
                <div className=" flex justify-between ">
                  <button onClick={() => handleDescription(restaurant._id)}>
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
                  <span className="text-gray-500">
                    Rating: {restaurant.averageRating.toFixed(2)}
                  </span>
                  <div>
                    {ratings.map((rating, index) => (
                        <div key={index}>
                          <span>{rating.comment}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomaPage;
