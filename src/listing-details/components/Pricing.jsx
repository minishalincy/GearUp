import { Button } from '@/components/ui/button'
import React from 'react'
import { MdLocalOffer } from "react-icons/md";

function Pricing({carDetail}) {
  return (
    <div className='p-10 rounded-xl border shadow-md'>
        <h2>Our Price</h2>
        <h2 className='font-bold text-4xl'>${carDetail?.sellingPrice}</h2>

        <Button className='w-full mt-7 bg-red-900' size='lg'><MdLocalOffer className='text-gray-300 text-lg mr-2'/>Make an Offer Price</Button>
    </div>
  )
}

export default Pricing