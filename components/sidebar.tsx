import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserCircle2, BrainCircuit, Bot, LogOut, Menu, X } from 'lucide-react'
import { SignOutButton } from "@clerk/nextjs"
import { useState } from "react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const menuItems = [
    {
      href: "/profile",
      icon: UserCircle2,
      label: "Profile"
    },
    {
      href: "/quiz",
      icon: BrainCircuit,
      label: "Gen Z Quizz"
    },
    {
      href: "/tatebot",
      icon: Bot,
      label: "Tatebot"
    }
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md p-2 rounded-full"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out",
          "md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-2 p-4 border-b">
          
            <img src="https://utfs.io/f/tohTttgIkwLBfWiRGJ4VraNYqupKDLOejH1yW3JUgx2G4Ezc" alt=""className="h-12 w-18 rounded-full bg-foreground" />
         
          <span className="font-semibold">Tateism</span>
        </div>
        
        <nav className="space-y-1 p-2">
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
                  "hover:bg-muted/30 hover:text-foreground",
                  "active:scale-95",
                  pathname === item.href 
                    ? "bg-muted/50 text-foreground font-semibold" 
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
          
          <div className="pt-4 border-t mt-4">
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
        </nav>
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