import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import MyListing from './components/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from './components/Inbox'
import { useSearchParams } from "react-router-dom";

function Profile() {
    const [searchParams] = useSearchParams();
    const defaultTab = searchParams.get("tab") || "my-listing";

    return (
        <div>
            <Header />
            <div className='px-30 md:px-20 my-25'>
                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className='w-full flex justify-start'>
                        <TabsTrigger value="my-listing">My Listing</TabsTrigger>
                        <TabsTrigger value="inbox">Inbox</TabsTrigger>
                        
                    </TabsList>
                    <TabsContent value="my-listing">
                        <MyListing />
                    </TabsContent>
                    <TabsContent value="inbox"><Inbox /></TabsContent>
                    
                </Tabs>
            </div>
        </div>
    );
}


export default Profile