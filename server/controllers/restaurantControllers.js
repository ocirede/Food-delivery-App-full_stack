import Restaurant from "../models/restaurantSchema.js";

//Add new restaurant
export const handleAddNewReastaurant = async (req, res) => {
  try {
    const { name, description, address } = req.body;

    const newReastaurant = new Restaurant({
      name,
      description,
      address,
    });
    await newReastaurant.save();

    res.send({ success: true, newUser });
    console.log("New restaurant created successfully:", newUser);
  } catch (error) {
    console.error("Error creating the restaurant");
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add many restaurants
export const handleAddManyRestaurants = async (req, res) => {
  try {
    const restaurantsData = req.body;

    const newRestaurants = await Restaurant.insertMany(restaurantsData);

    res.send({ success: true, newRestaurants });
    console.log("New restaurants created successfully:", newRestaurants);
  } catch (error) {
    console.error("Error creating the restaurants");
    res.status(500).send({ success: false, error: error.message });
  }
};

//get all restaurants
//const response = await axios.get(import.meta.env.VITE_BASE_URL +`/restaurants/getall?category=${category}`
export const getAllRestaurants = async (req, res) => {
  const { category } = req.query;
  console.log(req.query);
  try {
    let filter = {};

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const restaurants = await Restaurant.find(filter);

    res.send({ success: true, restaurants });
  } catch (error) {
    console.log("Error getting all restaurants:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Update a restaurant
export const updateRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  //updateUser(user._id, { address: updatedData }); front end

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.send({ success: false, message: "Restaurant not found" });
    }

    console.log("Restaurant updated successfully:", updatedRestaurant);
    res.send({
      success: true,
      restaurant: updatedRestaurant,
      message: "Restaurant updated successfully",
    });
  } catch (error) {
    console.error("Error updating the restaurant", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
