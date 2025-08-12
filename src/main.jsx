import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Contact from './contact'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes' 
import Profile from './profile'
import AddListing from './add-listing'
import { Toaster } from 'sonner'
import SearchByCategory from './search/[category]'
import SearchByOptions from './search'
import ListingDetail from './listing-details/[id]'
import SignUpPage from './SignUpPage';


// ✅ Import your custom sign-in page
import SignInPage from './SignInPage'
import Inbox from './profile/components/Inbox'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/contact', element: <Contact /> },
  { path: '/profile', element: <Profile /> },
  { path: '/add-listing', element: <AddListing /> },
  { path: '/search', element: <SearchByOptions /> },
  { path: '/search/:category', element: <SearchByCategory /> },
  { path: '/listing-details/:id', element: <ListingDetail /> },
  { path: '/sign-up', element: <SignUpPage /> },
 { path: "/inbox", element: <Inbox/> },



  // ✅ Custom login route
  { path: '/sign-in', element: <SignInPage /> },
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/sign-in"
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#b91c1c',
        },
      }}
    >
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
)
