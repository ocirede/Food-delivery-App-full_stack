import React, { useContext, useState } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function DescriptionPage() {
  const { restaurant, AddOrder, setMenu, menu } = useContext(RestaurantContext);
  const {user} = useAuthContext()
  return (
    <div className=" mt-60 flex flex-col gap-4 justify-center items-center">
      <div className="font-bold text-5xl mb-2"> {restaurant?.name}</div>

      <div className="max-w-lg rounded overflow-hidden shadow-lg">
        <div>
          {/* <img className="w-full" src={restaurant.image} alt={restaurant.name} /> */}
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">{restaurant?.description}</p>
          </div>

          <div className="px-6 py-4">
            <h3 className="font-bold mb-2">Menu</h3>
            {restaurant?.menu.map((item, index) => (
              <div key={index} className="mb-2">
                <div className=" flex justify-between items-center">
                  <div>
                    <button onClick={() =>  setMenu(prevOrders => [...prevOrders, item._id])}>
                      <span className="font-bold">{item.name}</span> -{" "}
                    </button>
                    <span>{item.price}</span>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                  <div className=" flex justify-center ">
                    {" "}
                    <Plus className=" cursor-pointer" />
                    <Minus className=" cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 flex justify-center items-center">
            <button onClick={() => AddOrder(user._id, restaurant._id, menu)} className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Order ({menu.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionPage;
