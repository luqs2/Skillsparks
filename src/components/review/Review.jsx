import React from "react";
import "./Review.scss";
import stars from "../../assets/img/icon/star.png";
import like from "../../assets/img/icon/like.png";
import dislike from "../../assets/img/icon/dislike.png";
import defaultAvatar from "/Public/img/noavatar.png";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
  // Fetch user details using userId from the review
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviewUser", review.userId], // Use review.userId to fetch the specific user's data
    queryFn: () =>
      newRequest
        .get(`/users/${review.userId}`) // Fetch user info based on the userId
        .then((res) => res.data)
        .catch((err) => {
          throw new Error("Failed to fetch user data");
        }),
  });

  return (
    <div className="review">
      {/* User Information */}
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="user">
          <img
            className="pp"
            src={data?.img || defaultAvatar}
            alt="User Profile"
          />
          <div className="info">
            <span>{data?.username}</span>
            <div className="country">
              <span>{data?.country}</span>
            </div>
          </div>
        </div>
      )}

      {/* Star Rating */}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((_, index) => (
            <img key={index} src={stars} alt={`Star ${index + 1}`} />
          ))}
        <span>{review.star}</span>
      </div>

      {/* Review Text */}
      <p>{review.desc}</p>

      {/* Helpful Section */}
      <div className="helpful">
        <span>Helpful?</span>
        <img src={like} alt="Like" />
        <span>Yes</span>
        <img src={dislike} alt="Dislike" />
        <span>No</span>
      </div>
    </div>
    
  );
  
};

export default Review;
