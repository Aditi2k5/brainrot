'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, pleb.</h1>
        </div>
        <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=192&width=192"
            alt="Profile"
            width={192}
            height={192}
            className="object-cover"
          />
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Sign in to Tateism</h2>
              <p className="text-sm text-gray-500">Welcome back! You must regain Tates trust...</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-center gap-2"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Continue with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="w-full"
                />
              </div>
              <Button 
                className="w-full bg-orange-400 hover:bg-orange-500"
                onClick={() => router.push('/profile')}
              >
                Continue
              </Button>
            </div>
            <div className="text-center text-sm">
              Do not have an account?
              <Link href="/signup" className="text-orange-500 hover:text-orange-600">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

