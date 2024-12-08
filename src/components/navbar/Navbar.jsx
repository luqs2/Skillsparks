import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import defaultAvatar from "/Public/img/noavatar.png";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className="container">
        <Link to="/">
          <div className="logo">
            <span className="text">SkillSparks</span>
          </div>
        </Link>

        <div className="links">
          <Link className="link">Available Gig</Link>
          <Link className="link">Become Provider</Link>

          {!currentUser && <Link className="link" to="/Login">Sign in</Link>}
          {!currentUser?.isSeller && <span>Become seller</span>}
          <Link to="/Register">
            {!currentUser && <button>Join</button>}
          </Link>

          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={currentUser?.img || defaultAvatar}
                alt="user profile"
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="link" to="/Mygigs">Gigs</Link>
                      <Link className="link" to="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link className="link" to="/orders">Orders</Link>
                  <Link className="link" to="/messages">Messages</Link>
                  <Link className="link" onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {active || pathname !== '/' ? (
        <div className="menu">
          <Link className="link menuLink" to="/">Graphics & Design</Link>
          <Link className="link menuLink" to="/">Video & Animation</Link>
          <Link className="link menuLink" to="/">Writing & Translation</Link>
          <Link className="link menuLink" to="/">AI Services</Link>
          <Link className="link menuLink" to="/">Digital Marketing</Link>
          <Link className="link menuLink" to="/">Music & Audio</Link>
          <Link className="link menuLink" to="/">Programming & Tech</Link>
          <Link className="link menuLink" to="/">Business</Link>
          <Link className="link menuLink" to="/">Lifestyle</Link>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
