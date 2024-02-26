import Restaurant from "../models/restaurantSchema.js";

//Add new restaurant
export const handleAddNewReastaurant = async (req, res) => {
  try {
    const { name, description, info, address, menu, category } = req.body;

    const newReastaurant = new Restaurant({
      name,
      description,
      info,
      address,
      menu,
      category,
    });
    await newReastaurant.save();

    res.send({ success: true, newReastaurant });
    console.log("New restaurant created successfully:", newReastaurant);
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

//find restaurant by id
export const findRestaurant = async (req, res) => {
  try {
    //const restaurantId = req.body;
    const { restaurantId } = req.params;
    console.log(restaurantId);

    const restaurant = await Restaurant.findById(restaurantId);

    res.send({ success: true, restaurant });
  } catch (error) {
    console.log("Error finsing the restaurant:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};
