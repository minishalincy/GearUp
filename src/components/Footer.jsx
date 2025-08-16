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
      className="w-[50px] h-[60px] scale-300 object-contain"
    />
  </Link>
</div>


        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
  Discover your next ride with ease. Browse thousands of verified listings, compare prices, 
  and connect with trusted sellers — all in one place.
</p>


    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
  <li>
    <span className="text-gray-700">
      © {new Date().getFullYear()} Built by{" "}
      <a
        href="https://personal-portfolio-q9lq.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-gray-700 hover:text-gray-900 transition cursor-pointer"
      >
        Minishalincy
      </a>
    </span>
  </li>
</ul>




       
      </div>
    </footer>
  )
}

export default Footer