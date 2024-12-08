import React, { useState, useRef, useEffect } from 'react';
import "./Gigs.scss";
import down from "../../assets/img/icon/down.png";
import GigCard from '../../components/gigcard/GigCard';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef(null);
  const maxRef = useRef(null);
  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigsData', search, sort],
    queryFn: () =>
      newRequest.get(`/gigs${search ? search : '?'}&min=${minRef.current?.value || 0}&max=${maxRef.current?.value || 9999}&sort=${sort}`).then(res => res.data),
    keepPreviousData: true, // Avoid UI flickering between fetches
  });

  const gigsData = Array.isArray(data) ? data : data?.gigs || [];

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

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
            <input ref={minRef} type="number" placeholder='min' />
            <input ref={maxRef} type="number" placeholder='max' />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className='sortby'>Sort by</span>
            <span className='sorttype'>{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src={down} alt="Dropdown icon" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }} />
            {open && (
              <div className="rightmenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Bestselling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
              ? <p>Something went wrong!</p>
              : gigsData.length > 0
                ? gigsData.map((gig) => <GigCard key={gig._id} item={gig} />)
                : "No gigs found"}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
