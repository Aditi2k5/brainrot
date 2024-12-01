"use client"

import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row items-center justify-center bg-white px-4">
      <div className="w-full max-w-md md:max-w-2xl flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 lg:space-x-16">
        {/* Left side - Image */}
        <div className="w-48 md:w-1/2 lg:w-2/5 flex-shrink-0">
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
            <img
              src="https://utfs.io/f/tohTttgIkwLBjs0Z7Jsm1uJ6fwE0PFXBatOUvnN2Wo9AITLd"
              alt="Profile"
              className="object-cover"
            />
          </div>
          <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-center">
            Welcome back, pleb.
          </h1>
        </div>

        {/* Right side - Sign In */}
        <div className="w-full max-w-sm md:w-1/2 lg:w-3/5">
          <SignIn
            signUpUrl="/sign-up"
            appearance={{
              variables: {
                colorPrimary: "#FEA84B",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
