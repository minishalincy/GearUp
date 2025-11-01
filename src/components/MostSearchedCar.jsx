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

  const [carList, setCarList] = useState([])

  useEffect(() => {
    GetPopularCarList()
  }, [])

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
    <div className="relative w-full px-4 sm:px-6 md:px-10 lg:px-16 py-10 bg-gray-50">
      <h2 className="font-bold text-3xl text-center mb-8 text-gray-800 tracking-tight">
        Most Searched Cars
      </h2>

      {/* subtle fade edges for polish */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
          duration: 700,
        }}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex items-center gap-4">
          {carList.map((car, index) => (
            <CarouselItem
              key={index}
              className="
                basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5
                flex justify-center transition-transform duration-300
                hover:scale-[1.03] hover:z-20
              "
            >
              <div className="w-full">
                <CarItem car={car} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows visible only on md+ screens */}
        <div className="hidden md:flex">
          <CarouselPrevious className="left-2 bg-white/70 hover:bg-white shadow-md backdrop-blur-sm border rounded-full" />
          <CarouselNext className="right-2 bg-white/70 hover:bg-white shadow-md backdrop-blur-sm border rounded-full" />
        </div>
      </Carousel>
    </div>
  )
}

export default MostSearchedCar
