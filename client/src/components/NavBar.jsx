import React, { useContext } from "react";
import { Search, LogOut } from "lucide-react";
import DropMenu from "./DropMenu";
import Home from "./Home";
import { useAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { RestaurantContext } from "../context/restaurantContext";

function NavBar() {
  const { user } = useAuthContext();

  return (
    <>
      <nav className=" w-full h-28 flex items-center">
        <ul className=" w-full flex items-center justify-around gap-10 ">
          <Home />
          <div className=" w-1/3 flex items-center gap-6">
            <h2 className=" text-xl">I am empty and I am hungry!!</h2>
            <ShoppingBag className=" w-20 h-20" />
          </div>

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
