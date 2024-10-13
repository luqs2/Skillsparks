import React, { useState } from 'react'
import "./Gigs.scss"
import down from "../../assets/img/icon/down.png"
import GigCard from '../../components/gigcard/GigCard';
import { gigs } from '../../data';

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className='gigs'>
      <div className="container">
        <span className='breadcrumb'>SkillSpark &gt; Graphic & Design</span>
        <h1>AI Artist</h1>
        <p>Explore the boundaries with our AI Artist</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder='min' />
            <input type="text" placeholder='max' />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className='sortby'>Sort by</span>
            <span className='sorttype'>{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img 
              src={down} 
              alt="Dropdown icon" 
              onClick={() => setOpen(!open)} 
              style={{ cursor: 'pointer' }} 
            />
            {open && (
              <div className="rightmenu">
                { sort === "sales" ? (<span onClick={() => reSort("createdAt")}>Newest</span>)
                : (<span onClick={() => reSort("sales")}>Bestselling</span>)}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs.map(gig=>(
            <GigCard key={gig.id} item={gig}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
