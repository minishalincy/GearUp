import FakeData from '@/Shared/FakeData'
import React, { useEffect, useState } from 'react'
import CarItem from './CarItem'
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CarImages, CarListing } from './../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import { db } from './../../configs'
import Service from '@/Shared/Service'

function MostSearchedCar() {

  const[carList,setCarList]=useState([])
 
   useEffect(()=>{
    GetPopularCarList()
  },[])

  const GetPopularCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .orderBy(desc(CarListing.id))
      .limit(10)


    const resp = Service.FormatResult(result)
    console.log(resp);
    setCarList(resp)
    
  }
  return (
    <div>
      <h2 className='font-bold text-3xl text-center mt-16 mb-7'>
        Most Searched Cars
      </h2>

      <Carousel
        plugins={[
          Autoplay({
            delay: 1700, // very short delay to create continuous motion
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
          duration: 100, // smooth, slow transition speed
        }}
        className="w-full overflow-hidden"
      >
        <CarouselContent>
          {carList.map((car, index) => (
            <CarouselItem key={index} className="basis-1/5">
              <CarItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Optional arrows, you can remove for ticker style */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default MostSearchedCar
