"use client"

import { Copy, MousePointer2, Check } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface LinkCardProps {
  id: string
  shortUrl: string
  originalUrl: string
  favicon: string
  clicks: number
  createdAt: string
  isActive?: boolean
}

export function LinkCard({
  id,
  shortUrl,
  originalUrl,
  favicon,
  clicks,
  createdAt,
  isActive = true,
}: LinkCardProps) {
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatClicks = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on interactive elements
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('a')) {
      return
    }
    router.push(`/links/${id}`)
  }

  return (
    <div 
      className="group flex cursor-pointer items-center gap-4 rounded-lg bg-transparent p-4 transition-colors hover:border-muted-foreground/50"
      style={{ border: "1px solid #2e2e2e" }}
      onClick={handleCardClick}
    >
      {/* Favicon */}
      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary">
        <img
          src={favicon}
          alt=""
          className="size-6 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
        />
      </div>

      {/* Link Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm font-medium text-foreground hover:underline"
          >
            {shortUrl.replace("https://", "")}
          </a>
          <button
            onClick={handleCopy}
            className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Copy link"
          >
            {copied ? (
              <Check className="size-3.5 text-accent" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="max-w-[200px] truncate">{originalUrl}</span>
          <span>•</span>
          <span>{createdAt}</span>
        </div>
      </div>

      {/* Click Stats */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="flex items-center gap-1.5 text-sm">
          <MousePointer2 className="size-4 text-muted-foreground" />
          <span className="font-medium text-foreground">
            {formatClicks(clicks)}
          </span>
        </div>
        <div
          className={cn(
            "size-2 rounded-full",
            isActive ? "bg-accent" : "bg-muted-foreground"
          )}
          title={isActive ? "Active" : "Inactive"}
        />
      </div>
    </div>
  )
}
