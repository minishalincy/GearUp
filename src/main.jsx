import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Contact from './contact'
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import AddListing from './add-listing'
import { Toaster } from 'sonner'
import SearchByCategory from './search/[category]'
import SearchByOptions from './search'
import ListingDetail from './listing-details/[id]'
import Inbox from './profile/components/Inbox'
import MyListing from './profile/components/MyListing'
import Profile from './profile/index'



const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/contact', element: <Contact /> },
  { path: '/profile', element: <Profile /> },
  { path: '/add-listing', element: <AddListing /> },
  { path: '/search', element: <SearchByOptions /> },
  { path: '/search/:category', element: <SearchByCategory /> },
  { path: '/listing-details/:id', element: <ListingDetail /> },
  { path: '/inbox', element: <Inbox /> },
  { path: '/my-listing', element: <MyListing /> },

   { path: "/sign-in", element: <SignIn routing="path" path="/sign-in" /> }

])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <SignedIn>
        <RouterProvider router={router} />
      </SignedIn>
      <SignedOut>
        <div className="flex justify-center items-center min-h-screen">
          <SignIn />
        </div>
      </SignedOut>
      <Toaster />
    </ClerkProvider>
  </StrictMode>
)