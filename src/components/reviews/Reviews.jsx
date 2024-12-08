import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import { FaStar } from "react-icons/fa"; // Importing star icon
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const [rating, setRating] = useState(null);
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating) {
      mutation.mutate({ gigId, desc, star: rating });
      setDesc(""); // Reset description after submission
      setRating(null); // Reset the rating after submission
    }
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}

      {/* Add Review Section */}
        <h3 className="title">Add a review</h3>
      <div className="add">
        <form className="addForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write your opinion"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          {/* Star Rating */}
          <div className="starRating">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <FaStar
                key={starValue}
                className={`star ${rating >= starValue ? "selected" : ""}`}
                onClick={() => setRating(starValue)}
              />
            ))}
          </div>

          <button type="submit" disabled={!rating || !desc}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
