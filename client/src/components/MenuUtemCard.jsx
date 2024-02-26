import React, { useContext, useState } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { Minus, Plus } from "lucide-react";

const MenuItemCard = ({ item }) => {
  const { itemCounts, handleIncrement, handleDecrement } =
    useContext(RestaurantContext);

  return (
    <div className="menu-item-card  flex flex-col shadow-xl px-4 py-8 w-1/3  transition-transform duration-300 transform-gpu hover:scale-110 cursor-pointer  mt-6">
      <div className=" flex items-center  justify-between ">
        <div>
          <span className="font-bold">{item.name}</span> -{" "}
          <span>{item.price}</span>
          <p className="text-gray-700">{item.description}</p>
        </div>
        <div className="flex  gap-1">
          <button onClick={() => handleIncrement(item._id)}>
            <Plus />
          </button>
          {itemCounts[item._id] || 0}
          <button onClick={() => handleDecrement(item._id)}>
            <Minus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
