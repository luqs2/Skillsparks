import React from 'react';
import "./GigCard.scss";
import { Link } from 'react-router-dom';
import star from "../../assets/img/icon/star.png";
import heart from "../../assets/img/icon/heart.png";

const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/${item.id}`} className="link">
      <div className="gigcard">
        <img src={item.img} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="Profile" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src={star} alt="Rating" />
            <span>{item.star}</span>
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
