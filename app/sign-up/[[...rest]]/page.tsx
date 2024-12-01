"use client"

import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row items-center justify-center bg-white px-4">
      <div className="w-full max-w-md md:max-w-2xl flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 lg:space-x-16">
        {/* Left side - Image */}
        <div className="w-48 md:w-1/2 lg:w-2/5 flex-shrink-0">
          <div className=" overflow-hidden rounded-lg shadow-md bg-red-900">
            <img
              src="https://utfs.io/f/tohTttgIkwLBIM4QZUcbZjpeGEr2Wm61iIz4SyUgV8dvRN39"
              alt="Profile"
              className="object-cover h-full w-full"
            />
          </div>
          <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-center">
            Not done yet!
          </h1>
        </div>

        {/* Right side - Sign Up */}
        <div className="w-full max-w-sm md:w-1/2 lg:w-3/5">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
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
