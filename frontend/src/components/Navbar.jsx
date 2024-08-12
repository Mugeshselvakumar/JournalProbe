/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaFile } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import hamburger from '../assets/burger-menu-svgrepo-com.svg';
import close from '../assets/close-svgrepo-com.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toPublish = () => {
    navigate('/addjournals');
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#f4f7f0] shadow-md py-4 px-6'>
      <span className='text-5xl'>J<span className='text-4xl mb-2 absolute'>P</span></span>
      <div className='flex flex-row gap-x-4 justify-center items-center'>
        <button onClick={toPublish} className='flex bg-green-700 w-[15rem] h-[3rem] items-center justify-center rounded-full gap-x-3'>
          <FaFile className='text-3xl px-2 text-white' />
          <span className='text-xl text-white'>Add your Journal</span>
        </button>
        
        <div className='block relative'>
          <ul className={`
            lg:flex flex-col lg:flex-row absolute lg:static gap-x-12 text-xl
            top-8 ${(isMenuOpen) ? '-left-12' : 'hidden'} px-5 lg:p-0 shadow-lg lg:shadow-none lg:overflow-hidden
          `}>
            <Link to='/home'><li className='p-4 ml-3 lg:p-0 shadow-sm'>Home</li></Link>
            <Link to='/journals'><li className='p-4 lg:p-0'>Journals</li></Link>
            <Link to='/contactus'><li className='p-4 lg:p-0 transition-transform ease-in-out'>Reach Out to Us</li></Link> 
            <Link to='/profile'><li className='p-4 lg:p-0'>Profile</li></Link>
          </ul>
        </div>
        <button onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
          <img src={(isMenuOpen) ? close : hamburger} className='h-8 lg:hidden'/>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
