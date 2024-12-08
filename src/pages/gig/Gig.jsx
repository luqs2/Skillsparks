import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import stars from "../../assets/img/icon/star.png";
import clock from "../../assets/img/icon/clock.png";
import recycle from "../../assets/img/icon/recycle.png";
import greencheck from "../../assets/img/icon/greencheck.png";
import like from "../../assets/img/icon/like.png";
import dislike from "../../assets/img/icon/dislike.png";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest"; // Assuming you have a newRequest utility
import defaultAvatar from "/Public/img/noavatar.png"; // Correct path for default avatar
import Reviews from "../../components/reviews/reviews";

function Gig() {
  const { id } = useParams();

  // Fetching gig details using useQuery hook
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () =>
      newRequest
        .get(`/gigs/single/${id}`)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error("Failed to fetch gig details");
        }),
  });

  const userId=data?.userID

  // Fetching user details based on userId from the gig data
  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ["user", data?.userId],
    queryFn: () =>
      newRequest
        .get(`/users/${data?.userId}`)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error("Failed to fetch user details");
        }),
    enabled: !!data?.userId, // Ensures the query runs only when data.userId exists
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Something went wrong. Please try again.</div>;
  }

  const averageRating = !isNaN(data.totalStars / data.starNumber)
    ? Math.round(data.totalStars / data.starNumber)
    : 0;

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">
            SkillSparks {">"} Graphics & Design {">"}
          </span>
          <h1>{data.title}</h1>

          {/* Displaying user information */}
          {isLoadingUser ? (
            "Loading user information..."
          ) : errorUser ? (
            "Something went wrong with fetching user data."
          ) : (
            <div className="user">
              <img
                className="pp"
                src={dataUser?.img || defaultAvatar} // Use defaultAvatar if user image is not available
                alt="User"
              />
              <span>{dataUser?.username}</span> {/* Displaying the username */}
              <div className="stars">
                {/* Displaying star rating based on the average rating */}
                {!isNaN(averageRating) && (
                  <>
                    {Array(averageRating)
                      .fill()
                      .map((_, i) => (
                        <img src={stars} alt="star" key={i} />
                      ))}
                    <span>{averageRating}</span> {/* Display the average rating */}
                  </>
                )}
              </div>
            </div>
          )}

          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            {data.images && data.images.length > 0 ? (
              data.images.map((img, index) => (
                <img key={index} src={img} alt={`gig-image-${index}`} />
              ))
            ) : (
              <p>No images available</p>
            )}
          </Slider>

          <h2>"About This Gig"</h2>
          <p>{data.Desc}</p>

          {/* Seller's information */}
          {isLoadingUser ? (
            "Loading seller information..."
          ) : errorUser ? (
            "Something went wrong with fetching seller data."
          ) : (
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img
                  src={dataUser?.img || defaultAvatar}
                  alt="Seller"
                />
                <div className="info">
                  <span>{dataUser?.username}</span> {/* Seller's username */}
                  <div className="stars">
                    {!isNaN(averageRating) && (
                      <>
                        {Array(averageRating)
                          .fill()
                          .map((_, i) => (
                            <img src={stars} alt="star" key={i} />
                          ))}
                        <span>{averageRating}</span>
                      </>
                    )}
                  </div>
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  {[
                    { title: "From", desc: "USA" },
                    { title: "Member since", desc: "Aug 2022" },
                    { title: "Avg. response time", desc: "4 hours" },
                    { title: "Last delivery", desc: "1 day" },
                    { title: "Languages", desc: "English" },
                  ].map((item, idx) => (
                    <div key={idx} className="item">
                      <span className="title">{item.title}</span>
                      <span className="desc">{item.desc}</span>
                    </div>
                  ))}
                </div>
                <hr />
                <p>{dataUser?.desc}</p> {/* Displaying seller description */}
              </div>
            </div>


          )}

            <Reviews gigId={id}/>

          
        </div>

        {/* Right section */}
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>RM {data.price}</h2>
          </div>
          <p>{data.shortDesc}</p>
          <div className="details">
            <div className="item">
              <img src={clock} alt="Clock" />
              <span>{data.deliveeryDate} Days Delivery</span>
            </div>
            <div className="item">
              <img src={recycle} alt="Recycle" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>

          

          <div className="features">
            {data.features && data.features.length > 0 ? (
              data.features.map((feature, idx) => (
                <div className="item" key={idx}>
                  <img src={greencheck} alt="Feature" />
                  <span>{feature}</span>
                </div>
              ))
            ) : (
              <p>No features listed.</p>
            )}
          </div>
          <Link to ={`/pay/${id}`} >
          <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Gig;
