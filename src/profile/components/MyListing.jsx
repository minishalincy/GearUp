import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import { db } from './../../../configs'
import { CarImages, CarListing } from './../../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Service from './../../Shared/Service'
import CarItem from '@/components/CarItem'
import { IoTrashSharp } from "react-icons/io5"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function MyListing() {
  const { user } = useUser()
  const [carList, setCarList] = useState([])

  useEffect(() => {
    if (user) {
      GetUserCarListing()
    }
  }, [user])

  // Fetch user car listings
  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CarListing.id))

   const resp = Service.FormatResult(result).map(car => ({
  ...car,
  displayImage: car.images?.length > 0 
    ? car.images[car.images.length - 1].imageUrl 
    : "https://placehold.co/400x300?text=No+Image"
}));

setCarList(resp);

    setCarList(resp)
  }

  // Delete listing by ID
  const DeleteCarListing = async (id) => {
    try {
      // Delete related images first
      await db.delete(CarImages).where(eq(CarImages.carListingId, id))

      // Delete the car listing
      await db.delete(CarListing).where(eq(CarListing.id, id))

      // Update UI state after deletion
      setCarList((prev) => prev.filter((car) => car.id !== id))

      toast.success("Car listing deleted successfully!")
    } catch (error) {
      console.error("Error deleting listing:", error)
      toast.error("Failed to delete listing.")
    }
  }

  return (
    <div className='mt-6'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-4xl'>My Listing</h2>
        <Link to={'/add-listing'}>
          <Button>Add New Listing</Button>
        </Link>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
        {carList.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className='p-3 bg-white rounded-b-md flex justify-end gap-4 shadow-sm border'>
              {/* Edit button */}
              <Link to={'/add-listing?mode=edit&id=' + item?.id} className='w-full'>
                <Button
                  variant='outline'
                  className="w-[100px] hover:bg-gray-200 transition-all"
                >
                  Edit
                </Button>
              </Link>

              {/* Delete button with confirmation dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='destructive'
                    className='flex items-center gap-2 hover:bg-red-700 transition-all'
                  >
                    <IoTrashSharp />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. It will permanently delete this listing and remove its data from our database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => DeleteCarListing(item.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyListing
