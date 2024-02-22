import React, { useContext } from "react";
import { RestaurantContext } from "../context/restaurantContext";

function SubNav() {
  const {handleRestaurantsCategory}= useContext(RestaurantContext)
  return (
    <nav className="bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 ">
          <ul className="flex space-x-28">
            <button onClick={() => handleRestaurantsCategory("Asian")}>
              <li className="text-gray-600 text-lg hover:text-gray-900 cursor-pointer underline">
                Asian food
              </li>
            </button>
            <button onClick={() => handleRestaurantsCategory("American")}>
              <li className="text-gray-600 text-lg hover:text-gray-900 cursor-pointer underline">
                American food
              </li>
            </button>

            <button onClick={() => handleRestaurantsCategory("Italian")}>
              <li className="text-gray-600 text-lg hover:text-gray-900 cursor-pointer underline">
                Italian food
              </li>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SubNav;
