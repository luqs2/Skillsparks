import React, { useState, useEffect } from 'react';
import './Featured.scss';

const Featured = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='featured'>
      <div className="background-overlay"></div>
      <div className={`featured-container ${isScrolled ? 'scrolled' : ''}`}>
        {/* Motto for SkillSpark */}
        <h1 className="welcome">Welcome to SkillSpark</h1>
        <h2 className="motto">Empowering  Students to Freelance with Confidence</h2>

        {/* Search Bar */}
        <div className="searchBar">
          <input type="text" placeholder="Search for gigs, skills, or students..." />
          <button>Search</button>

          
        </div>
        <div className="visual-content">
        <p>Discover freelance opportunities and gigs designed for university students!</p>
      </div>
      </div>

      
    </div>
  );
};

export default Featured;
