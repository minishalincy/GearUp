import Header from '@/components/Header'
import Search from '@/components/Search'
import { db } from './../../../configs'
import { CarImages, CarListing } from './../../../configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Service from '@/Shared/Service'
import CarItem from '@/components/CarItem'


function SearchByCategory() {

  const { category } = useParams()
  const [carList, setCarList] = useState([])

  useEffect(() => {
    GetCarList()
  }, [])

  const GetCarList = async () => {
    const result = await db.select().from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.category, category))
    const resp = Service.FormatResult(result)

    setCarList(resp);

  }

  return (
    <div>
      <Header />

      <div className="p-4 md:p-10 bg-black flex justify-center items-center">
        <div className="w-full max-w-2xl bg-white rounded-full shadow-xl px-6 py-4 md:px-8 md:py-6 flex items-center">
          <Search className="w-full max-w-2xl" />
        </div>
      </div>
      <div className='p-10 md:px-10'>
        <h2 className='font-bold text-4xl '>{category}</h2>

        {/* list of cars */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'> 
        {carList?.length>0  ? carList.map((item,index)=>(

          <div key={index}>

            <CarItem car={item}/>
            </div>
        )):
        [1,2,3,4,5,6].map((item,index)=>(
          <div className="h-[300px] rounded-2xl bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 shadow-lg animate-pulse">


          </div>
        ))}
         </div>
      </div>
    </div>
  )
}

export default SearchByCategory