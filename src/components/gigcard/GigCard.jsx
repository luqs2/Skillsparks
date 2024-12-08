import React from 'react';
import "./GigCard.scss";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Import the hook
import newRequest from '../../utils/newRequest'; // API utility function
import star from "../../assets/img/icon/star.png";
import heart from "../../assets/img/icon/heart.png";
import defaultAvatar from "/Public/img/noavatar.png"; // Import fallback image

const GigCard = ({ item }) => {
  // Fetch user data using react-query
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId], // Corrected syntax for queryKey
    queryFn: () => newRequest.get(`/users/${item.userId}`).then(res => res.data), // Resolve response
    keepPreviousData: true, // Prevent flicker on UI
  });

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigcard">
        <img 
          src={item.cover || defaultAvatar} // Fallback image for gig cover
          alt="Gig Cover" 
          onError={(e) => e.target.src = defaultAvatar} // Fallback on error
        />
        <div className="info">
          {isLoading ? (
            "Loading..." // Display loading text while fetching
          ) : error ? (
            <p>Error loading user data</p> // Display error message
          ) : (
            <div className="user">
              <img 
                src={data?.img || defaultAvatar} // Fallback image for user profile
                alt="Profile" 
                onError={(e) => e.target.src = defaultAvatar} // Fallback on error
              />
              <span>{data?.username || "Unknown User"}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src={star} alt="Rating" />
            <span>
              {/* Calculate average rating or fallback to 'No Ratings' */}
              {item.starNumber > 0
                ? Math.round(item.totalStars / item.starNumber)
                : "No Ratings"}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src={heart} alt="Favorite" />
          <div className="price">
            <span>STARTING AT</span>
            <span>RM{item.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
