import Card from "../models/cardSchema.js";

export const handleAddNewCard = async (req, res) => {
  const { userId } = req.params;

  const { number, expiry, cvv, cardholder } = req.body;
  try {
    const newCard = new Card({
      user:userId,
      card: {
        number,
        expiry,
        cvv,
        cardholder,
      },
    });
    await newCard.populate("user");
    await newCard.save();
    return res
      .status(201)
      .json({ success: true, message: "New card added successfully", newCard });
  } catch (error) {
    console.error("Error adding new card:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const handleGetCard = async (req, res) => {
  const { userId } = req.params;

  

    try {
        const card = await Card.find({ user: userId }).populate("user");
        if (card.length === 0) {
            return res.status(404).json({ success: false, message: 'No cards found for the user' });
        }
      
    return res.status(200).json({ success: true, card });
  } catch (error) {
    console.error("Error fetching cards:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
