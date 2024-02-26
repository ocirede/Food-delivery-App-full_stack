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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="sm:max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-8 py-6">
            <h2 className="text-gray-800 text-3xl font-semibold mb-4">
              Your opinion matters to us!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center">
                <span className="text-lg text-gray-800 mr-4">
                  How was the quality of our service?
                </span>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <svg
                      key={value}
                      className={`w-8 h-8 ${
                        value <= rating ? "text-yellow-500" : "text-gray-500"
                      } cursor-pointer`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onClick={() => handleRatingChange(value)}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <textarea
                rows="3"
                className="p-4 text-gray-500 rounded-xl resize-none w-full"
                onChange={handleCommentChange}
                
                value={comment}
                placeholder="Your feedback..."
              ></textarea>
              <button
                type="submit"
                className="py-3 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl w-full hover:from-purple-600 hover:to-indigo-700"
              >
                Submit Feedback
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center py-4">
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
