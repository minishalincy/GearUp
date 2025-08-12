import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Contact from './contact'
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react'
import { dark } from '@clerk/themes' 
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

  // Clerk auth routes:
  { path: '/sign-in/*', element: <SignIn routing="path" path="/sign-in" /> },
  { path: '/sign-up/*', element: <SignUp routing="path" path="/sign-up" /> },
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{ baseTheme: dark }}
      afterSignOutUrl="/sign-in"
      
    >
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
