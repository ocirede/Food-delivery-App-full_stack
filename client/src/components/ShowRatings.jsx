const ShowRatings = ({ ratings, setShowRatings }) => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Ratings</h2>
        {/* Example content */}
        <div
          style={{
            height: "300px",
            width: "600px",
            overflowY: "auto",
            border: "grey solid 1px",
            borderRadius: "2%",
          }}
        >
          {ratings.map((rating) => (
            <div
              key={rating._id}
              className="flex items-end justify-between gap-10 p-4 border border-gray-300 rounded-lg shadow-md mb-4"
            >
              <div>
                <p className="mr-2">
                  <b>{rating.user.username}</b>
                </p>
                <p className="mr-2">{rating.comment}</p>
              </div>

              <div className="flex items-center">
                {[...Array(rating.ratingNumber)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 text-yellow-500`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1.32c-.145-.467-.82-.467-.965 0L7.38 6.363 2.12 7.65c-.51.077-.714.683-.327 1.025l4.287 3.955-1.136 5.902c-.144.747.65 1.337 1.277.906L10 15.437l4.777 2.045c.628.43 1.421-.16 1.277-.906l-1.136-5.902 4.287-3.955c.387-.342.183-.948-.327-1.025l-5.26-1.287L10 1.32z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowRatings(false)}
          className="text-red-500 hover:text-red-700 font-bold mt-4"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default ShowRatings;
