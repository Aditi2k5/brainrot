'use client'
import { Layout } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function ProfilePage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Blue Piller details 💊</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg"
                alt="Profile picture"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-medium">Username (pleb)</h2>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">About You?</h3>
              <Button size="sm">Save</Button>
            </div>
            <Textarea
              placeholder="Tell us why you are not a blue piller..."
              className="min-h-[150px]"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

