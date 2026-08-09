"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { LinksDashboard } from "@/components/dashboard/links-dashboard"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {sidebarOpen && <Sidebar />}
      <LinksDashboard onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
    </div>
  )
}
