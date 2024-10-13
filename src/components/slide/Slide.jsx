import React, { useState, useEffect } from "react";
import "./Slide.scss";
import Slider from "infinite-react-carousel";

const Slide = ({ children, dots, slidesToShow, arrowsScroll, scrollThreshold }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(false); // Hide slider when scrolled past threshold
      } else {
        setIsVisible(true); // Show slider when within threshold
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  return (
    <div className={`slide ${isVisible ? "" : "scrolled-up"}`}>
      <div className="container">
        <Slider dots={dots} slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
