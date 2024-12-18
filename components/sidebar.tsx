"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  UserCircle2,
  BrainCircuit,
  Bot,
  LogOut,
  Menu,
  X,
  Bitcoin,
  RatIcon,
  DollarSign,
} from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user } = useUser()

  const menuItems = [
    {
      href: "/tatebot",
      icon: Bot,
      label: "Tatebot",
    },
    {
      href: "/quiz",
      icon: BrainCircuit,
      label: "Gen-Z Quiz",
    },
    {
      href: "/vbucks",
      icon: DollarSign,
      label: "V-Bucks",
    },
    {
      href: "/chilling",
      icon: RatIcon,
      label: "Chill Zone",
    },

  ]
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md p-2 rounded-full"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed shadow-lg inset-y-0 left-0 z-40 w-64 bg-background border-r border-[#FEA84B] rounded-r-xl transform transition-transform duration-300 ease-in-out flex flex-col",
          "md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-2 p-4">
          <img
            src="https://utfs.io/f/tohTttgIkwLBfWiRGJ4VraNYqupKDLOejH1yW3JUgx2G4Ezc"
            alt=""
            className="h-12 w-18 rounded-full bg-foreground"
          />

          <span className="font-semibold text-3xl">Tateism</span>
        </div>

        <nav className="flex flex-col gap-2 p-2 flex-grow">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 transition-all duration-200",
                  "hover:bg-[#FEA84B] hover:text-foreground",
                  "active:scale-95",
                  pathname === item.href
                    ? "bg-[#F9BD7C] text-foreground font-semibold"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* User Info Section pushed to bottom */}
        {user && (
          <div className="flex items-center gap-3 p-4 border-t border-[#FEA84B]">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <img
                src={user.imageUrl || "/placeholder.svg"}
                alt="Profile picture"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {user.fullName || user.username || "User"}
              </h2>
         
            </div>
          </div>
        )}

        <div className="p-2 border-t border-[#FEA84B]">
          <SignOutButton>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-destructive",
                "hover:bg-destructive/10 hover:text-destructive",
                "active:scale-95"
              )}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 md:pl-0 transition-all duration-300 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  )
}