"use client"

import { useState } from "react"
import { use } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { LinkDetail } from "@/components/dashboard/link-detail"

// Mock data to get the short URL from ID
const mockLinks: Record<string, string> = {
  "1": "https://lnk.sh/react-docs",
  "2": "https://lnk.sh/vercel-deploy",
  "3": "https://lnk.sh/nextjs15",
  "4": "https://lnk.sh/tailwind-css",
  "5": "https://lnk.sh/github-repo",
  "6": "https://lnk.sh/typescript",
}

export default function LinkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const shortUrl = mockLinks[id] || "https://lnk.sh/unknown"

  return (
    <div className="flex h-screen bg-background">
      {sidebarOpen && <Sidebar />}
      <LinkDetail
        linkId={id}
        shortUrl={shortUrl}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  )
}
