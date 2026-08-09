"use client"

import { useState } from "react"
import { Plus, Search, ChevronDown, LayoutGrid, List, PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LinkCard } from "./link-card"

const mockLinks = [
  {
    id: "1",
    shortUrl: "https://lnk.sh/react-docs",
    originalUrl: "https://reactjs.org/docs/getting-started.html",
    favicon: "https://reactjs.org/favicon.ico",
    clicks: 12453,
    createdAt: "2 hours ago",
    isActive: true,
  },
  {
    id: "2",
    shortUrl: "https://lnk.sh/vercel-deploy",
    originalUrl: "https://vercel.com/docs/deployments/overview",
    favicon: "https://vercel.com/favicon.ico",
    clicks: 8721,
    createdAt: "5 hours ago",
    isActive: true,
  },
  {
    id: "3",
    shortUrl: "https://lnk.sh/nextjs15",
    originalUrl: "https://nextjs.org/blog/next-15",
    favicon: "https://nextjs.org/favicon.ico",
    clicks: 24192,
    createdAt: "1 day ago",
    isActive: true,
  },
  {
    id: "4",
    shortUrl: "https://lnk.sh/tailwind-css",
    originalUrl: "https://tailwindcss.com/docs/installation",
    favicon: "https://tailwindcss.com/favicons/favicon-32x32.png",
    clicks: 5631,
    createdAt: "2 days ago",
    isActive: true,
  },
  {
    id: "5",
    shortUrl: "https://lnk.sh/github-repo",
    originalUrl: "https://github.com/vercel/next.js",
    favicon: "https://github.com/favicon.ico",
    clicks: 3829,
    createdAt: "3 days ago",
    isActive: true,
  },
  {
    id: "6",
    shortUrl: "https://lnk.sh/typescript",
    originalUrl: "https://www.typescriptlang.org/docs/handbook/intro.html",
    favicon: "https://www.typescriptlang.org/favicon-32x32.png",
    clicks: 7412,
    createdAt: "5 days ago",
    isActive: false,
  },
]

interface LinksDashboardProps {
  onToggleSidebar: () => void
}

export function LinksDashboard({ onToggleSidebar }: LinksDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("All Links")

  const filteredLinks = mockLinks.filter(
    (link) =>
      link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="flex-1 overflow-auto" style={{ backgroundColor: "#090909" }}>
      <div className="mx-auto max-w-5xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
              aria-label="Toggle sidebar"
              onClick={onToggleSidebar}
            >
              <PanelLeft className="size-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-2xl font-semibold text-foreground hover:text-foreground/80">
                Links
                <ChevronDown className="size-5" />
              </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setSortBy("All Links")}>
                All Links
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Active Links")}>
                Active Links
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Inactive Links")}>
                Inactive Links
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button 
            className="gap-2 text-foreground hover:opacity-80"
            style={{ backgroundColor: "#1f1f1f" }}
          >
            <Plus className="size-4" />
            Create Link
          </Button>
        </div>

        <Separator className="my-6 bg-border" />

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <LayoutGrid className="size-4" />
              Display
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <List className="size-4" />
              Bulk Actions
            </Button>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-border bg-input pl-9 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Link Cards */}
        <div className="mt-6 space-y-3">
          {filteredLinks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
              <p className="text-muted-foreground">No links found</p>
              <Button variant="link" className="mt-2 text-accent">
                Create your first link
              </Button>
            </div>
          ) : (
            filteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                id={link.id}
                shortUrl={link.shortUrl}
                originalUrl={link.originalUrl}
                favicon={link.favicon}
                clicks={link.clicks}
                createdAt={link.createdAt}
                isActive={link.isActive}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
