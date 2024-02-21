import { useState } from "react";
import { useContext } from "react";
import { RestaurantContext } from "../context/restaurantContext";
import { useAuthContext } from "../context/authContext";
import { Link, useLocation } from "react-router-dom";

const RatingPage = () => {
  const { addNewRating } = useContext(RestaurantContext);
  const { user } = useAuthContext();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("Give us your opinion here!");

  // we will use query get the restaurantId
  //The path will look like this: navigate(`/rating?restaurantId=${restaurant._id}`);
  //getting restaurant id from there
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const restaurantId = queryParams.get("restaurantId");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewRating(user._id, restaurantId, rating, comment);
    //console.log("rating====>>>", rating);
    //console.log("comment===>>", comment);
    setRating(0);
    setComment("Give us your opinion here!");
  };

  return (
    <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 py-5">
            <h2 className="text-gray-800 text-3xl font-semibold">
              Your opinion matters to us!
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-200 w-full flex flex-col items-center"
          >
            <div className="flex flex-col items-center py-6 space-y-3">
              <span className="text-lg text-gray-800">
                How was quality of our service?
              </span>
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <svg
                    key={value}
                    className={`w-12 h-12 ${
                      value <= rating ? "text-yellow-500" : "text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => handleRatingChange(value)}
                    style={{ cursor: "pointer" }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="w-3/4 flex flex-col">
              <textarea
                rows="3"
                className="p-4 text-gray-500 rounded-xl resize-none"
                onChange={handleCommentChange}
                value={comment}
              ></textarea>

              <button
                type="submit"
                className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
              >
                Rate now
              </button>
            </div>
          </form>
          <div className="h-20 flex items-center justify-center">
            <Link className="text-gray-600" to="/">
              Maybe later
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
