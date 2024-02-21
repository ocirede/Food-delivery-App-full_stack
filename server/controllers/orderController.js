import Order from "../models/orderSchema.js";
import Restaurant from "../models/restaurantSchema.js";
import User from "../models/userSchema.js";

//Add new order
export const handleAddNewOrder = async (req, res) => {
  try {
    const { userId, restaurantId, menuIds } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        error: "User not found.",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        error: "Restaurant not found.",
      });
    }

    const orderedMenuItems = [];

    for (const menuItem of menuIds) {
      const foundMenuItem = restaurant.menu.find(
        (item) => item._id.toString() === menuItem
      );
      //console.log("foundMenuItem==>", foundMenuItem);
      if (!foundMenuItem) {
        throw new Error(
          `Menu item with ID ${menuItem} not found in the restaurant's menu.`
        );
      }
      orderedMenuItems.push({
        name: foundMenuItem.name,
        description: foundMenuItem.description,
        price: foundMenuItem.price,
      });
    }
    //console.log("orderedMenuItems==>", orderedMenuItems);
    const newOrder = new Order({
      user: userId,
      restaurant: restaurantId,
      menu: orderedMenuItems,
    });

    await newOrder.populate("user");
    await newOrder.populate("restaurant");

    await newOrder.save();

    res.send({ success: true, newOrder });
    console.log("New Order placed successfully:", newOrder);
  } catch (error) {
    console.error("Error placing the Order:", error);
    res.status(500).send({ success: false, error: error.message });
  }
};

//get the users orders
export const getOrdersForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId })
      .populate("user")
      .populate("restaurant");
    if (!orders) {
      return res.send({
        success: false,
        message: "Orders not found for this user",
      });
    }
    res.send({ success: true, orders });
  } catch (error) {
    console.error("Error finding the orders for the user", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};
