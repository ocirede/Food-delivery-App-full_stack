import React, { useContext, useState } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { Minus, Plus, XCircle } from "lucide-react";

const MenuItemCard = ({ item }) => {
  const {setItemCounts} = useContext(RestaurantContext)
  const [open, setOpen] = useState(false);
  const toggleOpen = (itemId) => {
    setOpen(!open);
    setItemCounts(0) 

  console.log(itemId) };

  const { itemCounts, handleIncrement, handleDecrement } =
    useContext(RestaurantContext);

  return (
    <>
      {open ? (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="h-full fixed z-20 overflow-y-auto flex justify-center items-center">
            <div
              className="h-1/3 w-2/4 fixed ml-0"
              style={{
                backgroundImage:
                  "url(https://image.shutterstock.com/image-photo/italian-food-background-cuisine-ingredients-260nw-1499710865.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <XCircle
                onClick={() => toggleOpen(item._id)}
                className=" text-white absolute w-10 h-10  ml-2 mt-2 cursor-pointer"
              />
              <div className=" h-full w-full flex flex-col justify-center items-center">
                <div className=" w-full h-full flex flex-col justify-center gap-8 mt-20 ml-12 text-white font-bold">
                  <span className="font-bold text-2xl ">{item.name}</span>{" "}
                  <span>{item.price} €</span>
                  <p className="">{item.description}</p>
                </div>

                <div className="h-full w-full  flex flex-col items-center justify-end ">
                  <div className="w-full justify-center flex items-center mb-4">
                    <div className=" h-full w-1/3 flex justify-center items-center rounded-lg cursor-pointer gap-4 bg-white opacity-80 ">
                      <Plus onClick={() => handleIncrement(item._id, item.price)} />
                      {itemCounts[item._id] || 0}
                      <Minus onClick={() => handleDecrement(item._id)} />
                    </div>
                    <button
                      onClick={() => toggleOpen(item._id)}
                      className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-lg  ml-4 w-1/3"
                    >
                      Add to order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" ">
          <div className="menu-item-card  flex flex-col shadow-xl px-4 py-8  transition-transform duration-300 transform-gpu hover:scale-110 cursor-pointer  bg-slate-50 mt-6">
            <div className="h-28 ">
              <div className="  w-full flex flex-col gap-2">
                <div className=" flex justify-between">
                  <span className="font-bold">{item.name}</span>{" "}
                  <span>{item.price} €</span>
                </div>
                <p className="text-gray-700">{item.description}</p>
                <Plus
                  onClick={() => toggleOpen(item._id)}
                  className=" absolute mt-24  bg-cyan-700 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;
