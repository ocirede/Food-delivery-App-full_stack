import React, { useContext, useState } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { Plus, Minus } from "lucide-react";
import { useAuthContext } from "../context/authContext";

function DescriptionPage() {
  const { restaurant, placeNewOrder, itemCounts,handleIncrement,
    handleDecrement, userOrders } = useContext(RestaurantContext);
  const { user } = useAuthContext();
  
  console.log(userOrders)

  return (
    <div className=" mt-60 flex flex-col gap-4 justify-center items-center">
      <div className="font-bold text-5xl mb-2"> {restaurant?.name}</div>

      <div className="max-w-lg rounded overflow-hidden shadow-lg">
        <div>
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">{restaurant?.description}</p>
          </div>

          <div className="px-6 py-4">
            <h3 className="font-bold mb-2">Menu</h3>
            {restaurant?.menu.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <div>
                      <span className="font-bold">{item.name}</span> -{" "}
                    <span>{item.price}</span>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                  <div className="flex justify-center gap-1">
                    <button onClick={() => handleIncrement(item._id)}>
                      <Plus className="cursor-pointer" />
                    </button>
                    {itemCounts[item._id] || 0}
                    <button onClick={() => handleDecrement(item._id)}>
                      <Minus className="cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 flex justify-center items-center">
            <button onClick={() => placeNewOrder(user._id, restaurant._id, userOrders)} className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Order 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionPage;

