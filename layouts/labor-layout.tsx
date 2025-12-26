import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export function LaborLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header userName="Labor User" role="Labor" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar role="labor" />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
