import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-red-900">
  <Link
    to="/"
    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    <img
      src="/logo.svg"
      alt="Logo"
      className="w-[100px] h-[60px] scale-300 object-contain"
    />
  </Link>
</div>


        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
  Discover your next ride with ease. Browse thousands of verified listings, compare prices, 
  and connect with trusted sellers — all in one place.
</p>


        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Buy a Car </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Sell Your Car </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> New Arrivals </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Car Reviews </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Financing </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Contact Us </a>
          </li>
        </ul>


       
      </div>
    </footer>
  )
}

export default Footer