import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa6";

function DetailHeader({ carDetail }) {
    if (!carDetail) return <p className='text-red-700'>Loading car details...</p>;

    return (
        <div>

            {carDetail?.listingTitle ? <div>
                <h2 className='font-bold text-3xl'>{carDetail.listingTitle}</h2>
                <p className='text-sm'>{carDetail.tagline}</p>

                <div className='flex gap-2 mt-3'>
                    <div className='flex gap-2 items-center bg-[#ecd7d9] rounded-full p-2 px-3'>
                        <FaRegCalendarAlt className='h-7 w-7 text-red-900' />
                        <h2 className='text-red-900 text-sm'>{carDetail.year}</h2>
                    </div>

                    <div className='flex gap-2 items-center bg-[#ecd7d9] rounded-full p-2 px-3'>
                        <MdSpeed className='h-7 w-7 text-red-900' />
                        <h2 className='text-red-900 text-sm'>{carDetail.mileage}</h2>
                    </div>

                    <div className='flex gap-2 items-center bg-[#ecd7d9] rounded-full p-2 px-3'>
                        <GiGearStickPattern className='h-7 w-7 text-red-900' />
                        <h2 className='text-red-900 text-sm'>{carDetail.transmission}</h2>
                    </div>

                    <div className='flex gap-2 items-center bg-[#ecd7d9] rounded-full p-2 px-3'>
                        <FaGasPump className='h-7 w-7 text-red-900' />
                        <h2 className='text-red-900 text-sm'>{carDetail.fuelType}</h2>
                    </div>
                </div>
            </div> :

                <div className='w-full rounded-xl h-[100px] bg-slate-100 animate-pulse'>

                </div>}
        </div>
    );
}

export default DetailHeader; 