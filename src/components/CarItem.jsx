import React from 'react';
import { Separator } from './ui/separator';
import { BsFuelPump } from "react-icons/bs";
import { MdSpeed } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { Link } from 'react-router-dom';

function CarItem({ car }) {
  const fallbackImage = "https://placehold.co/400x300?text=No+Image";

const imageUrl = car?.images?.length > 0
  ? car.images[car.images.length - 1].imageUrl  // Get latest image
  : fallbackImage;




  return (
    <Link to={'/listing-details/'+car?.id}>
    <div className='rounded-xl bg-[#ecd7d9] border hover:shadow-md cursor-pointer relative'>
      <h2 className='absolute m-1 bg-red-600 px-2 rounded-full text-sm pb-0.5 text-white'>New</h2>
      <img
        src={imageUrl}
        alt={car?.listingTitle || "Car"}
        width="100%"
        height={250}
        className='rounded-t-xl h-[180px] object-cover'
        onError={(e) => { e.target.src = fallbackImage }}
      />
      <div className='p-4'>
        <h2 className='font-bold text-black text-lg mb-2'>{car?.listingTitle}</h2>
        <Separator />
        <div className='grid grid-cols-3 mt-5'>
          <div className='flex flex-col items-center'>
            <BsFuelPump className='text-lg mb-2' />
            <h2 className='text-sm'>{car?.mileage} Miles</h2>
          </div>
          <div className='flex flex-col items-center'>
            <MdSpeed className='text-lg mb-2' />
            <h2 className='text-sm'>{car?.fuelType}</h2>
          </div>
          <div className='flex flex-col items-center'>
            <GiGearStickPattern className='text-lg mb-2' />
            <h2 className='text-sm'>{car?.transmission}</h2>
          </div>
        </div>
        <Separator className="my-2" />
        <div className='flex items-center justify-between'>
          <h2 className='font-bold text-sm'>${car?.sellingPrice}</h2>
          <h2 className='text-red-900 text-sm flex gap-2 items-center'>
            View Details <MdOpenInNew />
          </h2>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default CarItem;
