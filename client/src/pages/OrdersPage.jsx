import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { useContext } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const { user } = useAuthContext();
  const { userOrders, userOrderhistory } = useContext(RestaurantContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(userOrders);

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const formattedDate = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()} ${date.getFullYear()}, ${date.toLocaleString(
      "en-US",
      {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }
    )}`;
    return formattedDate;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await userOrderhistory(user?._id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    if (user) {
      fetchData();
    }

  }, [user]);



  const handleAddReview = (restaurantId) => {
    navigate(`/rating?restaurantId=${restaurantId}`);
  };

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center justify-between">
          <Profile />
        </div>
      </div>
      <div className=" ml-40  mr-40 mt-20">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Menu
                </th>
                <th className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                userOrders?.map((order, index) => (
                  <tr key={index} className="text-md">
                    <td className="px-5 text-center py-5 border-b border-gray-200">
                      {order.restaurant.name}
                    </td>
                    <td className="px-5 py-5 text-center border-b border-gray-200">
                      {order.menu.map((menu, index) => (
                        <div key={index}>
                          <span>{menu.name}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-5 py-5 text-center border-b border-gray-200">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-5 py-5 text-center border-b border-gray-200">
                      {order.menu.reduce((acc, item) => {
                        const total = (acc += item.price);
                        return total;
                      }, 0).toFixed(2)} €
                    </td>
                    <td className="px-5 py-5 text-center border-b border-gray-200">
                      <button
                        onClick={() => handleAddReview(order.restaurant._id)}
                        className="text-md text-indigo-600 hover:text-indigo-900"
                      >
                        Add a review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
