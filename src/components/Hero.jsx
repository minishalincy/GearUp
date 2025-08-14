import React from 'react'
import Search from './Search'

function Hero() {
    return (
        <div>
            <div className='flex flex-col items-center p-10 py-45 gap-6 h-[680px] w-full bg-[#ecd7d9]'>
               
                <h2 className='text-[60px] font-bold'>Find Your Dream Car</h2>
                <Search/>

               <img src='/mgcyberster.png' alt="Car" className="w-250 h-auto -mt-45" />

            </div>
        </div>
    )
}

export default Hero