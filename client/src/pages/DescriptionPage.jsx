import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { RestaurantContext } from '../context/restaurantContext';

function DescriptionPage() {
    const { restaurants } = useContext(RestaurantContext);

  const   location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const restaurantid = queryParam.get("restaurantId")
  console.log(restaurantid)
  return (
    <>
      <div className="max-w-lg rounded overflow-hidden shadow-lg">
          <div key={index}>
            <img className="w-full" src={restaurant.image} alt={restaurant.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{restaurant.name}</div>
              <p className="text-gray-700 text-base">{restaurant.description}</p>
            </div>
            <div className="px-6 py-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {/* {isMenuOpen ? 'Hide Menu' : 'Show Menu'} */}
              </button>
              <button className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Order
              </button>
            </div>
              <div className="px-6 py-4">
                <h3 className="font-bold mb-2">Menu</h3>
                {restaurant.menu.map((item, index) => (
                  <div key={index} className="mb-2">
                    <span className="font-bold">{item.name}</span> - <span>{item.price}</span>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
         
          </div>
      </div>
    </>
  );

          }

export default DescriptionPage