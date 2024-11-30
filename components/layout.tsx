import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserCircle2, BrainCircuit, Bot, LogOut } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 border-r bg-background">
        <div className="flex items-center gap-2 p-4">
          <div className="h-8 w-8 rounded-full bg-foreground" />
          <span className="font-semibold">Tateism</span>
        </div>
        <nav className="space-y-1 p-2">
          <Link href="/profile">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 bg-muted/50",
              )}
            >
              <UserCircle2 className="h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link href="/quiz">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <BrainCircuit className="h-4 w-4" />
              Gen Z Quizz
            </Button>
          </Link>
          <Link href="/tatebot">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <Bot className="h-4 w-4" />
              Tatebot
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-500 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}

