import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './Footer.scss';

const Footer = () => {
  const [scrolledUp, setScrolledUp] = useState(false);
  const location = useLocation(); // Get current location

  // Pages where the scroll effect should be applied
  const scrollEffectPages = ['/home', '/about']; // Add routes where scroll effect is needed

  useEffect(() => {
    // Only apply scroll effect on certain pages
    if (scrollEffectPages.includes(location.pathname)) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 800) {
          setScrolledUp(true);
        } else {
          setScrolledUp(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Ensure the footer does not use the scroll effect on other pages
      setScrolledUp(false);
    }
  }, [location.pathname]); // Re-run effect when the location changes

  return (
    <div className={`footer ${scrolledUp ? 'scrolled-up' : ''}`}>
      <div className="footer-container">
        <div className="footer-section">
          <h2>About SkillSpark</h2>
          <p>
            SkillSpark connects students with freelance opportunities, helping them gain valuable experience while studying.
          </p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: support@skillspark.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>
            <a href="#">LinkedIn</a> | <a href="#">Twitter</a> | <a href="#">Facebook</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SkillSpark. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
