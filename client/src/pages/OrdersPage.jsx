import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { useContext } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { useAuthContext } from "../context/authContext";

function OrdersPage() {
  const { user } = useAuthContext();
  const { userOrders, userOrderhistory } = useContext(RestaurantContext);
  const [loading, setLoading] = useState(true); 

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
  }, []);

  return (
    <div>
      <Profile />
      <div className="ml-96 mr-96 mt-20 h-20">
        {loading ? ( 
          <div>Loading...</div>
        ) : (
          user &&
          userOrders && (
            <div>
              {" "}
              {userOrders.map((order, index) => (
                <div key={index} className=" flex gap-28">
                <p className=" text-lg font-bold" >{order.restaurant.name}</p>
                <p >{order.createdAt}</p>
                <p>{order.menu.price}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
