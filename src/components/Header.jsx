import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="w-full fixed top-0 left-0 z-50 flex justify-between items-center py-2 shadow-md bg-white">
      {/* Logo - aligned extreme left */}
      <Link
        to="/"
        className="flex items-center"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          className="w-[30px] h-[45px] ml-20  scale-600 object-contain"
        />
      </Link>

      {/* Navigation Links */}
      {/* <nav className="hidden md:flex gap-10">
        {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
          <li
            key={index} // or `${item}-${index}`
            className="list-none font-medium text-gray-800 hover:text-red-900 hover:scale-105 transition-all cursor-pointer"
          >
            {item}
          </li>
        ))}

      </nav> */}

      {/* Submit + Auth */}
      <div className="flex items-center gap-4">
        {isSignedIn && <UserButton />}
        <Link to={isSignedIn ? '/profile' : '/sign-in'}>
          <Button className="bg-red-900 hover:bg-red-800 text-white text-sm px-4 py-2 transition-all mr-4">
            Submit Listing
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
