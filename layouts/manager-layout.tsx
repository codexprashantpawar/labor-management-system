import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export function ManagerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header userName="Manager User" role="Manager" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar role="manager" />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
