'use client'


import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { useUser } from "@clerk/nextjs"

export default function WelcomePage() {
  const router = useRouter()
  const { user } = useUser()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-white px-4 text-center">
      <SignedOut>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to</h1>
          <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full bg-red-500">
            <img
              src="https://utfs.io/f/tohTttgIkwLBfWiRGJ4VraNYqupKDLOejH1yW3JUgx2G4Ezc"
              alt="Profile"
              width={128}
              height={128}
              className="absolute top-0 left-0 h-full w-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Tateism</h2>
        </div>
        <div className="space-y-4">
          <Button 
            onClick={() => router.push('/sign-up')}
            className="border border-orange-300 bg-white text-black hover:bg-gray-100"
          >
            Take the 💊
          </Button>
         
        </div>
      </SignedOut>

      <SignedIn>
        <div className="space-y-6 text-center">
        
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {user?.firstName || "Blue Piller"}!
            </h1>
          <div>
            <img src="https://utfs.io/f/tohTttgIkwLBcKo9YOtHM9JZw0kxOS3m8pGaKdUnFgyIqTVX" alt="" className="shadow-xl mt-4" />
          </div>
          </div>
          <div className="space-x-4">
            <Button onClick={() => router.push('/tatebot')} className="hover:scale-105 transition-transform duration-300 ease-in-out">
              Time to get Red-Pilled
            </Button>
         
          </div>
        </div>
      </SignedIn>
    </div>
  )
}