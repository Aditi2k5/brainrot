"use client"
import { Layout } from "@/components/sidebar"
import { UserProfile, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <Layout>
      <SignedIn>
        <div className="flex justify-center items-center min-h-screen p-6">
          <div className="w-full max-w-2xl space-y-6 text-center">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl font-bold">Red-Piller Details</h1>
            </div>
            
            {user && (
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <img
                    src={user.imageUrl || "/placeholder.svg"}
                    alt="Profile picture"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">
                    {user.fullName || user.username || "User"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
            )}

            {/* Optional: Clerk's UserProfile component for additional profile management */}
           
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Layout>
  )
}