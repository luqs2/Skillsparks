import React, { useEffect, useState } from 'react';
import "./Home.scss";
import Featured from '../../components/featured/Featured';
import CatCard from '../../components/catCard/CatCard';
import Slide from '../../components/slide/Slide';
import { cards, projects } from '../../data';
import setting from '../../assets/img/icon/setting.png';
import messageicon from '../../assets/img/icon/messageicon.png';
import idea from '../../assets/img/icon/idea.png';
import ProjectCard from '../../components/projectCard/ProjectCard';

const Home = () => {
  const [scrolledUp, setScrolledUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.querySelector('.features');
      if (featuresSection) {
        const sectionTop = featuresSection.getBoundingClientRect().top;
        const navbarHeight = 90; // Adjust to the actual height of your navbar
        if (sectionTop <= navbarHeight) {
          setScrolledUp(true); // Add fade-out effect
        } else {
          setScrolledUp(false); // Reset to normal
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      <Featured />
      <Slide slidesToShow={5} arrowsScroll={5} scrollThreshold={500}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
      <div className={`features ${scrolledUp ? 'scrolled-up' : ''}`}>
        <div className="title">Freelance at the tip of your finger</div>
        <div className="features-container">
          <div className="item">
            <img src={setting} alt="Setting icon" />
            <h1>Tailored for students</h1>
            <p>
              SkillSpark offers flexible gig opportunities that align with students' schedules and skill levels, allowing them to earn income and gain experience without compromising their studies.
            </p>
          </div>

          <div className="item">
            <img src={messageicon} alt="Message icon" />
            <h1>Streamlined Communication</h1>
            <p>
              SkillSpark integrates a real-time messaging system that allows sellers to communicate directly from the platform.
            </p>
          </div>

          <div className="item">
            <img src={idea} alt="Idea icon" />
            <h1>Integration with LinkedIn</h1>
            <p>
              SkillSpark is integrated with LinkedIn, allowing students to import their professional profiles and experiences seamlessly.
            </p>
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={4} scrollThreshold={1300}>
        {projects.map((card) => (
          <ProjectCard key={card.id} item={card} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
