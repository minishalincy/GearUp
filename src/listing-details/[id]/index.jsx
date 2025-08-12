import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../components/DetailHeader'
import { useParams } from 'react-router-dom'
import { db } from './../../../configs'
import { CarImages, CarListing } from './../../../configs/schema'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import ImageGallery from '../components/ImageGallery'
import Description from '../components/Description'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import Specification from '../components/Specification'
import OwnersDetail from '../components/OwnersDetail'
import Footer from '@/components/Footer'
import FinancialCalculator from '../components/FinancialCalculator'
import MostSearchedCar from '@/components/MostSearchedCar'

function ListingDetail() {

    const {id}=useParams()
    const [carDetail,setCarDetail] = useState()


    console.log(id);

    useEffect(()=>{
        GetCarDetail()
    },[])



   const GetCarDetail=async()=>{
        const result=await db.select().from(CarListing)
        .innerJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
        .where(eq(CarListing.id,id))


        const resp = Service.FormatResult(result)
        setCarDetail(resp[0]);
        

    }
    

  return (
    <div>
        
        <Header/> 

        <div className='p-20 md:px-20'>
            {/* header detail compponent */}
            <DetailHeader carDetail={carDetail}/>

            <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>

                {/* left section */}
                <div className='md:col-span-2 '>
                   {/* images of the car */}
                   <ImageGallery carDetail={carDetail}/>

                   {/* description of the car */}
                   <Description carDetail={carDetail}/>
                   

                   {/* feature list */}
                   <Features features={carDetail?.features}/>

                   {/* financial calculator */}
                   <FinancialCalculator carDetail={carDetail}/>

                </div>

                {/* right section */}
                <div>
                    {/* pricing */}
                    <Pricing carDetail={carDetail}/>

                    {/* properties of the car */}
                    <Specification carDetail={carDetail}/>

                    {/* owner details */}
                    <OwnersDetail carDetail={carDetail}/>

                </div>
            </div>

            <MostSearchedCar/>

        </div>

        <Footer/>


        
    </div>
  )
}

export default ListingDetail