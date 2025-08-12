import React from 'react'
import { Link } from 'react-router-dom'

function InfoSection() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-16">

          {/* Text Content */}
          <div>
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl leading-tight">
                Find Your Dream Car With Confidence
              </h2>

              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                Explore a wide range of premium cars from trusted sellers. Whether you’re looking for a brand-new luxury ride or a well-maintained pre-owned vehicle, we’ve got you covered.
              </p>
              <Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <button className="mt-8 px-6 py-3 rounded-lg bg-red-900 text-white font-semibold hover:bg-red-700 transition">
                  Browse Cars
                </button>
              </Link>

            </div>
          </div>

          {/* Image Section */}
          <div className="w-full">
            <img
              src="https://images.hdqwalls.com/wallpapers/black-mercedes-benz-amg-gt-4k-2020-m1.jpg"
              className="rounded-lg w-full h-[420px] object-cover shadow-xl"
              alt="Luxury car"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoSection
