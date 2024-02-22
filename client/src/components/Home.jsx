import React, { useContext } from "react";
import { useAuthContext } from "../context/authContext";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../context/restaurantContext";

function Home() {
  const { user } = useAuthContext();
  const {handleResetCategoryClick}= useContext(RestaurantContext)

  return (
    <div className="w-1/3 flex justify-start items-center gap-6 ml-16">
      <Link to="/">
        <HomeIcon onClick={() => handleResetCategoryClick()} className="w-8 h-8" />
      </Link>
      {user && user.address ? (
        <span>Home ({user.address.street})</span>
      ) : (
        <span>Home ()</span>
      )}
    </div>
  );
}

export default Home;
