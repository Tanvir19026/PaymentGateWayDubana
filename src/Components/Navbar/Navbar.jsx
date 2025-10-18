import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import LogoSection from '../LogoSection/LogoSection';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white section-container flex flex-col justify-center items-start px-4 py-2">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <LogoSection variant="navbar" />

        {/* --- Desktop Links (Laptop and above) --- */}
        <section className="hidden xl:block ms-[5vw] w-full">
          <div className="flex items-center">
            <Link className="ps-3">Home</Link>
            <Link className="ps-3">Reunion</Link>
            <Link className="ps-3">Members</Link>
            <Link className="ps-3">Be a Member</Link>
            <Link className="ps-3">Executives</Link>
            <Link className="ps-3">Duabana Talk</Link>
            <Link className="ps-3">Articles</Link>
            <Link className="ps-3">Activity</Link>
            <Link className="ps-3">Gallery</Link>
            <Link className="ps-3">About Us</Link>
            <button className="ms-2 bg-[#032177] text-white rounded-lg px-4 py-2 -mt-2 items-center">
              Login
            </button>
          </div>
        </section>

        {/* --- Mobile/Tablet/Large Menu Button --- */}
        <div className="xl:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#032177] p-2 rounded-md focus:outline-none"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* --- Mobile/Tablet Dropdown Menu --- */}
      {menuOpen && (
        <div className="xl:hidden w-full mt-3 bg-white border-t border-gray-200 flex flex-col space-y-2 py-3 px-2 shadow-md rounded-md">
          <Link className="px-3 py-1">Home</Link>
          <Link className="px-3 py-1">Reunion</Link>
          <Link className="px-3 py-1">Members</Link>
          <Link className="px-3 py-1">Be a Member</Link>
          <Link className="px-3 py-1">Executives</Link>
          <Link className="px-3 py-1">Duabana Talk</Link>
          <Link className="px-3 py-1">Articles</Link>
          <Link className="px-3 py-1">Activity</Link>
          <Link className="px-3 py-1">Gallery</Link>
          <Link className="px-3 py-1">About Us</Link>
          <button className="bg-[#032177] text-white rounded-lg px-4 py-2 mt-2">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
