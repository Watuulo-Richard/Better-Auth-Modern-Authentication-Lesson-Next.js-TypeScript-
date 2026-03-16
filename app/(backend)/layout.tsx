import Sidebar from "@/components/backend/dashboard/sidebar"
import TopNav from "@/components/backend/dashboard/top-nav"
import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className={`flex h-screen`}>
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-border">
          <TopNav user={user} />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-background">{children}</main>
      </div>
    </div>
  )
}
