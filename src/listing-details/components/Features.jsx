import React from 'react'
import { IoMdCheckboxOutline } from "react-icons/io"

function Features({features}) {

    if (!features || typeof features !== 'object') {
    return null; // or show a message like "No features available"
  }

  return (
    <div className='p-10 border shadow-md rounded-xl my-7 gap-8'> 
         
            <h2 className='font-medium text-2xl'>Features</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-5'>
                {Object.entries(features).map(([features,value])=>(
                    <div className='flex gap-2 items-center'>
                        <IoMdCheckboxOutline className='text-lg p-1 rounded-full bg-red-300 text-red-900'/>
                        <h2>{features}</h2>
                    </div>
                ))}
            </div>
        
    </div>
  )
}

export default Features