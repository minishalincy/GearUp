import Header from '@/components/Header'
import React, { useEffect, useRef, useState } from 'react'
import carDetails from '../Shared/carDetails.json'
import InputField from './components/inputField'
import DropDownField from './components/DropDownField'
import TextAreaField from './components/TextAreaField'
import { Separator } from '@/components/ui/separator'
import features from '../Shared/features.json'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { CarImages, CarListing } from './../../configs/schema'
import { db } from './../../configs'
import IconField from './components/IconField'
import UploadImages from './components/UploadImages'
import { RiLoader3Fill } from "react-icons/ri";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'

function AddListing() {
  const [formData, setFormData] = useState({})
  const [featuresData, setFeaturesData] = useState({})
  const [triggerUploadImages, setTriggerUploadImages] = useState()
  const [searchParams] = useSearchParams()
  const [loader, setLoader] = useState(false)
  const [carInfo, setCarInfo] = useState()
  const navigate = useNavigate()
  const { user } = useUser()

  const mode = searchParams.get('mode')
  const recordId = searchParams.get('id')

  // Ref for UploadImages
  const uploadImagesRef = useRef()

  useEffect(() => {
    if (mode === 'edit') {
      GetListingDetail()
    }
  }, [])

  const GetListingDetail = async () => {
    const result = await db.select().from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId))

    const resp = Service.FormatResult(result)
    setCarInfo(resp[0])
    setFormData(resp[0])
    setFeaturesData(resp[0].features || {})

    console.log("Car Listings from DB:", resp);
  }

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("User not found. Please login again.")
      return;
    }

    setLoader(true)
    toast('Please Wait...')

    if (mode === 'edit') {
      // Update existing listing
      await db.update(CarListing).set({
        ...formData,
        features: featuresData,
        createdBy: user?.primaryEmailAddress?.emailAddress.trim().toLowerCase(),
        postedOn: moment().format('DD/MM/YYYY')
      }).where(eq(CarListing.id, recordId))

      // Upload newly selected images
      if (uploadImagesRef.current) {
        await uploadImagesRef.current.uploadAllImages(recordId)
      }

      setLoader(false)
      navigate('/profile')
    } else {
      // Insert new listing
      try {
  const result = await db.insert(CarListing).values({
    ...formData,
    features: featuresData,
    createdBy: user?.primaryEmailAddress?.emailAddress.trim().toLowerCase(),
    userName: user?.fullName,
    userImageUrl: user?.imageUrl,
    postedOn: moment().format('DD/MM/YYYY')
  }).returning({ id: CarListing.id });

  if (result?.length) {
    setTriggerUploadImages(result[0]?.id);

    // ✅ Automatically navigate to My Listing page
    setTimeout(() => {
      navigate('/my-listing'); // 👈 redirect to "My Listing"
    }, 1000); // small delay to finish image upload
  }
} catch (e) {
  console.log("Error inserting:", e);
  setLoader(false);
}

  }}

  return (
    <div>
      <Header />
      <Toaster />
      <div className='px-10 md:px-20 my-30'>
        <h2 className='font-bold text-4xl'>{mode === 'edit' ? 'Edit Listing' : 'Add New Listing'}</h2>

        <form className='p-10 border rounded-xl mt-10'>
          <div>
            <h2 className='font-medium text-xl mb-6'>Car Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className='text-sm flex gap-2 items-center mb-1'>
                    <IconField icon={item?.icon} />
                    {item?.label}
                    {item.required && <span className='text-red-500'>*</span>}
                  </label>
                  {item.fieldType === 'text' || item.fieldType === 'number' ? (
                    <InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                  ) : item.fieldType === 'dropdown' ? (
                    <DropDownField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                  ) : item.fieldType === 'textarea' ? (
                    <TextAreaField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className='my-6' />

          <div>
            <h2 className='font-medium text-xl my-6'>Features</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
              {features.features.map((item, index) => (
                <div key={index} className='flex gap-2 items-center'>
                  <Checkbox
                    onCheckedChange={(value) => handleFeatureChange(item.name, value)}
                    checked={featuresData?.[item.name] || false}
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          <Separator className='my-6' />

          <UploadImages
            ref={uploadImagesRef}
            triggerUploadImages={triggerUploadImages}
            carInfo={carInfo}
            mode={mode}
            setLoader={setLoader}
          />

          <div className='mt-10 flex justify-end'>
            <Button className='text-white bg-red-900'
              type="submit"
              disabled={loader}
              onClick={onSubmit}>
              {!loader ? 'Submit' :
                <RiLoader3Fill className=' text-white animate-spin text-lg' />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddListing
