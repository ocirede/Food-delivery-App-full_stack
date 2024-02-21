import React from "react";
import Profile from "../components/Profile";
import { useAuthContext } from "../context/authContext";

function AddedCard() {
  const { card, user} = useAuthContext();
  console.log("====>",card)

  return (
    <div>
      <Profile />
      <div className=" ml-96 mr-96 mt-20 ">
        {user && card.length > 0 && (
          <div>
            {card.map((card, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-md mb-4">
                <h2 className="text-xl font-bold">
                  Card Number: {card.card.number}
                </h2>
                <p className="text-gray-600">Expiry Date: {card.card.expiry}</p>
                <p className="text-gray-600">
                  Cardholder Name: {card.card.cardholder}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddedCard;
