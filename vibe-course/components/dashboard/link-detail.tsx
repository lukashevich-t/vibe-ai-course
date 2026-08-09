"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Copy,
  MoreHorizontal,
  HelpCircle,
  RefreshCw,
  Tag,
  ChevronDown,
  FolderIcon,
  Link2,
  Target,
  Clock,
  Lock,
  PanelLeft,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LinkDetailProps {
  linkId: string
  shortUrl: string
  onToggleSidebar: () => void
}

export function LinkDetail({ linkId, shortUrl, onToggleSidebar }: LinkDetailProps) {
  const [copied, setCopied] = useState(false)
  const [conversionTracking, setConversionTracking] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://links.sh/pOg8x1e`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayShortUrl = shortUrl.replace("https://lnk.sh/", "")

  return (
    <main className="flex-1 overflow-auto" style={{ backgroundColor: "#090909" }}>
      <div className="mx-auto max-w-3xl p-6">
        {/* Top Bar */}
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
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Links
              </Link>
              <span className="text-muted-foreground">&gt;</span>
              <span className="text-foreground">{displayShortUrl}</span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="size-4 text-accent" />
              ) : (
                <Copy className="size-4" />
              )}
              Copy link
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-6 bg-border" />

        {/* Main Form */}
        <div className="space-y-6">
          {/* Destination URL */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Destination URL
              </label>
              <HelpCircle className="size-3.5 text-muted-foreground" />
            </div>
            <Input
              placeholder="https://example.com/subdomain-here"
              className="border-border bg-input text-foreground placeholder:text-muted-foreground"
              style={{ border: "1px solid #2e2e2e" }}
            />
          </div>

          {/* Short Link */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Short link
              </label>
              <button className="text-muted-foreground hover:text-foreground">
                <RefreshCw className="size-4" />
              </button>
            </div>
            <div className="flex gap-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-r-none border-r-0 border-border bg-input text-foreground hover:bg-secondary"
                    style={{ border: "1px solid #2e2e2e" }}
                  >
                    links.sh
                    <ChevronDown className="ml-2 size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>links.sh</DropdownMenuItem>
                  <DropdownMenuItem>lnk.sh</DropdownMenuItem>
                  <DropdownMenuItem>short.io</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                defaultValue="pOg8x1e"
                className="rounded-l-none border-border bg-input text-foreground"
                style={{ border: "1px solid #2e2e2e" }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <label className="text-sm font-medium text-foreground">Tags</label>
              <HelpCircle className="size-3.5 text-muted-foreground" />
            </div>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Select tags"
                className="border-border bg-input pl-9 text-foreground placeholder:text-muted-foreground"
                style={{ border: "1px solid #2e2e2e" }}
              />
            </div>
          </div>

          {/* Conversion Tracking */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Conversion tracking
              </label>
              <HelpCircle className="size-3.5 text-muted-foreground" />
            </div>
            <Switch
              checked={conversionTracking}
              onCheckedChange={setConversionTracking}
            />
          </div>

          <Separator className="bg-border" style={{ backgroundColor: "#2e2e2e" }} />

          {/* Folder */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <label className="text-sm font-medium text-foreground">Folder</label>
              <HelpCircle className="size-3.5 text-muted-foreground" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border-border bg-input text-foreground hover:bg-secondary"
                  style={{ border: "1px solid #2e2e2e" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex size-5 items-center justify-center rounded"
                      style={{ backgroundColor: "#1c2b1c" }}
                    >
                      <FolderIcon className="size-3" style={{ color: "#04c40a" }} />
                    </div>
                    Links
                  </div>
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex size-5 items-center justify-center rounded"
                      style={{ backgroundColor: "#1c2b1c" }}
                    >
                      <FolderIcon className="size-3" style={{ color: "#04c40a" }} />
                    </div>
                    Links
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex size-5 items-center justify-center rounded"
                      style={{ backgroundColor: "#2b1c1c" }}
                    >
                      <FolderIcon className="size-3" style={{ color: "#c40404" }} />
                    </div>
                    Marketing
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              placeholder="Add a short description here..."
              className="min-h-[100px] resize-none border-border bg-input text-foreground placeholder:text-muted-foreground"
              style={{ border: "1px solid #2e2e2e" }}
            />
          </div>

          {/* Option Chips */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
              style={{ border: "1px solid #2e2e2e" }}
            >
              <Link2 className="size-4" />
              UTM
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
              style={{ border: "1px solid #2e2e2e" }}
            >
              <Target className="size-4" />
              Targeting
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
              style={{ border: "1px solid #2e2e2e" }}
            >
              <Clock className="size-4" />
              Expiration
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
              style={{ border: "1px solid #2e2e2e" }}
            >
              <Lock className="size-4" />
              Password
            </Button>
          </div>

          <Separator className="bg-border" style={{ backgroundColor: "#2e2e2e" }} />

          {/* Created By */}
          <p className="text-sm text-muted-foreground">
            Created by adamsmith@gmail.com, April 10, 2026
          </p>
        </div>
      </div>
    </main>
  )
}
