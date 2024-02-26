import React, { useContext } from "react";
import { RestaurantContext } from "../context/restaurantContext";

const foodCategories = [
  {
    name: "Asian",
    image:
      "https://imageproxy.wolt.com/wolt-frontpage-images/categories/3188aa02-181c-11eb-8dc0-6e2275755fbc_8b140e11_cbed_4f92_bfa2_a85fc92d1249.jpg-md?w=600",
  },
  {
    name: "American",
    image:
      "https://imageproxy.wolt.com/wolt-frontpage-images/categories/0a824832-c5b0-11ea-8a94-b2000c51ab5c_4b9cac02_a445_4de3_acf2_94398063345e.jpg-md?w=600",
  },
  {
    name: "Italian",
    image:
      "https://imageproxy.wolt.com/wolt-frontpage-images/categories/2dee7458-c5b0-11ea-927e-c2fc8785833c_cdba243f_3aeb_451d_b57c_510558469373.jpg-md?w=600",
  },

  {
    name: "Japanese",
    image: "https://imageproxy.wolt.com/wolt-frontpage-images/categories/a2c61604-c5b1-11ea-b203-822e244794a0_a084bfe5_5b14_4fec_9b8b_f20dadbc3495.jpg-md?w=600"
  },
  {
    name: "Vegan",
    image:
      "https://imageproxy.wolt.com/wolt-frontpage-images/categories/0fed5918-c5b2-11ea-927e-c2fc8785833c_26d5a70b_6b9a_4e37_b972_c64cee6f6123.jpg-md?w=600",
  },

];
function FoodCategoryCards() {
  const { handleRestaurantsCategory } = useContext(RestaurantContext);

  return (
    <div className=" flex flex-col gap-8 container mx-auto px-4 py-8 mt-20 ">
      <h2 className="text-3xl font-bold mb-4">Food categories</h2>
      <div className="grid grid-cols-5 ">
        {foodCategories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center  w-64 h-76 cursor-pointer shadow-md "
            onClick={() => handleRestaurantsCategory(category.name)}
          >
            <img
              className=" rounded-xl object-cover transition-transform duration-300 transform-gpu hover:scale-110"
              src={category.image}
              alt="food category"
            />
            <p className="text-lg font-semibold text-black mt-2">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodCategoryCards;
