import React, { useContext, useState } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { useAuthContext } from "../context/authContext";
import MenuItemCard from "../components/MenuUtemCard";

function DescriptionPage() {
  const { restaurant, placeNewOrder, userOrders } =
    useContext(RestaurantContext);
  const { user } = useAuthContext();
  console.log(userOrders);

  return (
    <div className=" flex flex-col ml-4  mt-6">
      <h2 className=" text-6xl font-bold">{restaurant?.name}</h2>
      <div className=" flex gap-5 text-lg font-bold ">
        <p>Open until 22.15 h</p>
        <div className=" flex items-center  ">
          <svg
            className={`w-7 h-7 text-yellow-500 flex justify-center`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>{" "}
          {restaurant?.averageRating.toFixed(2)}
        </div>
      </div>

      <div
        className="relative  d bg-cover bg-center bg-no-repeat  h-72"
        style={{ backgroundImage: `url(${restaurant?.image})` }}
      ></div>

      <div className="px-6 py-4 mt-5">
        <h3 className="font-bold mb-2 text-2xl">Menu</h3>
        {restaurant?.menu.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}

        <div className="px-6 py-4 flex items-center">
          <button
            onClick={() => placeNewOrder(user._id, restaurant._id, userOrders)}
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Order
          </button>
        </div>
      </div>
      <div>
        <h3>Address:</h3>
        <p>{restaurant?.address.street}</p>
        <p>
          {restaurant?.address.city}, {restaurant?.address.postalCode}
        </p>
        <p>{restaurant?.address.country}</p>
        <p>Category: {restaurant?.category}</p>
      </div>
    </div>
  );
}

export default DescriptionPage;

// <div className=" mt-60 flex flex-col gap-4 justify-center items-center">
//   <div className="font-bold text-5xl mb-2"> {restaurant?.name}</div>

//   <div className="max-w-lg rounded overflow-hidden shadow-lg">
//     <div>
//       <div className="px-6 py-4">
//         <p className="text-gray-700 text-base">{restaurant?.description}</p>
//       </div>

//       <div className="px-6 py-4">
//         <h3 className="font-bold mb-2">Menu</h3>
//         {restaurant?.menu.map((item, index) => (
//           <div key={index} className="mb-2">
//             <div className="flex justify-between items-center">
//               <div>
//                   <span className="font-bold">{item.name}</span> -{" "}
//                 <span>{item.price}</span>
//                 <p className="text-gray-700">{item.description}</p>
//               </div>
//               <div className="flex justify-center gap-1">
//                 <button onClick={() => handleIncrement(item._id)}>
//                   <Plus className="cursor-pointer" />
//                 </button>
//                 {itemCounts[item._id] || 0}
//                 <button onClick={() => handleDecrement(item._id)}>
//                   <Minus className="cursor-pointer" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="px-6 py-4 flex justify-center items-center">
//         <button onClick={() => placeNewOrder(user._id, restaurant._id, userOrders)} className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//           Order
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
