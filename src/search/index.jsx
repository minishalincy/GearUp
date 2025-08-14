import Service from '@/Shared/Service'
import { db } from './../../configs'
import { CarImages, CarListing } from './../../configs/schema'
import { eq , and , sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '@/components/Header'
import Search from '@/components/Search'
import CarItem from '@/components/CarItem'

function SearchByOptions() {
    const [searchParam] = useSearchParams()
    const [carList,setCarList]=useState([])

    const condition = searchParam.get('cars')
    const make = searchParam.get('make')
    const price = searchParam.get('price')

    useEffect(()=>{

        GetCarList()

    },[])

   const GetCarList = async () => {
  let conditions = [];

  if (condition) {
    conditions.push(eq(CarListing.condition, condition));
  }
  if (make) {
    conditions.push(eq(CarListing.make, make));
  }
  if (price) {
    conditions.push(sql`${CarListing.sellingPrice} <= ${Number(price)}`);
  }

  let query = db
    .select()
    .from(CarListing)
    .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId));

  if (conditions.length > 0) {
    query = query.where(
      conditions.length > 1 ? and(...conditions) : conditions[0]
    );
  }

  const result = await query;
  const resp = Service.FormatResult(result);
  console.log(resp);
  setCarList(resp);
};



    return (
         <div>
      <Header />

      {/* <div className="p-4 md:p-10 bg-black flex justify-center items-center">
        <div className="w-full max-w-2xl bg-white rounded-full shadow-xl px-6 py-4 md:px-8 md:py-6 flex items-center">
          <Search className="w-full max-w-2xl" />
        </div>
      </div> */}
      <div className='p-20 md:px-10'>
        <h2 className='font-bold text-4xl '>Search result</h2>

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

export default SearchByOptions