import React, { useContext } from "react";
import DropMenu from "./DropMenu";
import Home from "./Home";
import { useAuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { RestaurantContext } from "../context/restaurantContext";

function NavBar() {
  const navigate = useNavigate()
  const { user } = useAuthContext();
  const { userAddedOrders, setUserAddedOrders } =
    useContext(RestaurantContext);
    console.log(userAddedOrders);

 const handleNavigate = () => {
  navigate("/checkout")
 }


  return (
    <>
      <nav className=" w-full h-28 flex items-center">
        <ul className=" w-full flex items-center justify-around gap-10 ">
          <Home />

          {userAddedOrders.length > 0 ? (
  <div className="w-1/6 h-12 flex justify-center items-center gap-4 bg-cyan-500 rounded-lg">
  <button onClick={handleNavigate} >
              <ul className=" flex justify-center items-center gap-4 ">
                <li className=" flex items-center justify-center bg-white opacity-70 p-1 font-bold w-6 h-6 rounded-full">
                  {userAddedOrders.reduce((acc, item) => {
                    const total = (acc += item.quantity);
                    return total;
                  }, 0)}{" "}
                </li>
                <span className=" text-black">View order:</span>
                <li className="">
                  {userAddedOrders.reduce((acc, item) => {
                      const totalPrice = acc += (item.price * item.quantity)
                      return (totalPrice)
                  }, 0).toFixed(2)}  €
                </li>
                </ul>
                </button>
                <button>
                <Trash2 onClick={() => setUserAddedOrders([])}/>
                </button>
             
             
                </div>

          ) : (
            <div className=" w-1/3 flex items-center gap-6">
              <h2 className=" text-xl">I am empty and I am hungry!!</h2>
              <ShoppingBag className=" w-20 h-20" />
            </div>
          )}

          {user ? (
            <DropMenu />
          ) : (
            <div className=" w-1/3 flex gap-6 ">
              <Link to="/signup">Sign-Up</Link>
              <Link to="/signin">Sign-In</Link>
            </div>
          )}
        </ul>
      </nav>
      <hr className=" border-zinc-950" />
    </>
  );
}

export default NavBar;
