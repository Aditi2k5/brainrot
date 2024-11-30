'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-white px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to</h1>
        <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full bg-red-500">
          <Image
            src="/placeholder.svg?height=128&width=128"
            alt="Profile"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Tateism</h2>
      </div>
      <Button 
        onClick={() => router.push('/signup')}
        className="border border-orange-300 bg-white text-black hover:bg-gray-100"
      >
        Take the 💊
      </Button>
    </div>
  )
}

