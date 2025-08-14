import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from './ui/separator'
import { FaSearch } from "react-icons/fa"
import Data from '../Shared/Data'
import { Link } from 'react-router-dom'

function Search() {
    const [cars, setCars] = useState("")
    const [make, setMake] = useState("")
    const [price, setPrice] = useState("")

    const searchUrl = `/search?cars=${encodeURIComponent(cars)}&make=${encodeURIComponent(make)}&price=${encodeURIComponent(price)}`

    return (
        <div className='relative p-2 md:p-2 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]'>

            {/* Cars Dropdown */}
            <Select onValueChange={setCars}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg font-extrabold">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white text-black">
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>

            <Separator orientation='vertical' className="hidden md:block" />

            {/* Car Makes Dropdown */}
            <Select onValueChange={setMake}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg font-extrabold">
                    <SelectValue placeholder="Car Makes" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white text-black">
                    {Data.CarMakes.map((maker) => (
                        <SelectItem key={maker.id} value={maker.name}>
                            {maker.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Separator orientation='vertical' className="hidden md:block" />

            {/* Pricing Dropdown */}
            <Select onValueChange={setPrice}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg font-extrabold ">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white text-black">
                    {Data.Pricing.map((p) => (
                        <SelectItem key={p.id} value={p.amount}>
                            {p.amount}$
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Search Icon */}
            <Link to={searchUrl}>
                <FaSearch className='text-[40px] bg-primary rounded-full p-3 text-primary-foreground hover:scale-105 transition-all cursor-pointer' />
            </Link>
        </div>
    )
}

export default Search
