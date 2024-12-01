import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, DollarSign, Gamepad2, Zap } from "lucide-react"
import { Layout } from "@/components/sidebar"

function Instruction({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center bg-secondary/50 rounded-lg p-3 mb-3 hover:bg-secondary/70 transition">
      {icon}
      <span className="text-foreground ml-3">{text}</span>
    </div>
  )
}

export default function VBucksPrankPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground flex">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-card border shadow-md border-border rounded-xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
              Get Free V-Bucks Now!
            </h1>

            <div className="space-y-4 mb-6">
              <Instruction
                icon={<Gamepad2 className="text-chart-4" />}
                text="Stand on one leg and recite the Fortnite dance names backwards"
              />
              <Instruction
                icon={<Zap className="text-chart-2" />}
                text="Tap your screen 108 times while saying 'V-Bucks' in a robot voice"
              />
              <Instruction
                icon={<DollarSign className="text-chart-1" />}
                text="Draw a perfect circle with your eyes closed (must be perfect!)"
              />
            </div>
            <div className="text-center">
              <Link
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                  Claim Your V-Bucks Now!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
