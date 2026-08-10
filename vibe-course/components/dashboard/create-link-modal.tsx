"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  CalendarClock,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CornerDownLeft,
  Crosshair,
  Folder,
  Link2,
  Lock,
  RotateCw,
  Tag,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

function FieldLabel({
  children,
  hint,
  action,
}: {
  children: React.ReactNode
  hint?: boolean
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 text-[13px] font-medium text-foreground">
        {children}
        {hint ? (
          <button
            type="button"
            className="text-muted-foreground/70 transition-colors hover:text-foreground"
            aria-label="More information"
          >
            <CircleHelp className="size-3.5" strokeWidth={2} />
          </button>
        ) : null}
      </span>
      {action}
    </div>
  )
}

const inputBase =
  "w-full rounded-lg border border-border bg-input px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/25"

function Chip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:border-ring hover:bg-accent hover:text-foreground"
    >
      <Icon className="size-3.5" strokeWidth={2} />
      {label}
    </button>
  )
}

export function CreateLinkModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tracking, setTracking] = useState(false)
  const [slug, setSlug] = useState("pOg8x1e")
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  const randomize = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let next = ""
    for (let i = 0; i < 7; i++) next += chars[Math.floor(Math.random() * chars.length)]
    setSlug(next)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay — clicking it closes the modal */}
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-[3px] animate-in fade-in duration-150"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-link-title"
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/60 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          {/* Left column */}
          <div className="flex flex-col gap-5 p-5 md:border-r md:border-border">
            <nav aria-label="Breadcrumb" id="create-link-title">
              <ol className="flex items-center gap-1 text-[13px]">
                <li className="text-muted-foreground">Links</li>
                <ChevronRight className="size-3.5 text-muted-foreground/60" aria-hidden="true" />
                <li className="font-medium text-foreground">New Link</li>
              </ol>
            </nav>

            {/* Destination URL */}
            <div className="flex flex-col gap-2">
              <FieldLabel hint>Destination URL</FieldLabel>
              <input
                type="url"
                placeholder="http://example.com/subdomain-here"
                className={inputBase}
                aria-label="Destination URL"
              />
            </div>

            {/* Short Link */}
            <div className="flex flex-col gap-2">
              <FieldLabel
                action={
                  <button
                    type="button"
                    onClick={randomize}
                    aria-label="Generate a random short link"
                    className="text-muted-foreground/70 transition-colors hover:text-foreground"
                  >
                    <RotateCw className="size-3.5" strokeWidth={2} />
                  </button>
                }
              >
                Short Link
              </FieldLabel>
              <div className="flex items-stretch rounded-lg border border-border bg-input transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25">
                <div className="relative flex items-center border-r border-border">
                  <select
                    aria-label="Domain"
                    defaultValue="links.sh"
                    className="appearance-none bg-transparent py-2 pl-3 pr-7 text-[13px] text-foreground outline-none"
                  >
                    <option value="links.sh">links.sh</option>
                    <option value="dub.sh">dub.sh</option>
                    <option value="go.link">go.link</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-2 size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  aria-label="Short link key"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[13px] text-foreground outline-none"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <FieldLabel hint>Tags</FieldLabel>
              <div className="flex items-center rounded-lg border border-border bg-input transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25">
                <Tag className="ml-3 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  placeholder="Select tags"
                  aria-label="Tags"
                  className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-[13px] text-foreground outline-none placeholder:text-muted-foreground/70"
                />
              </div>
            </div>

            {/* Conversion Tracking */}
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                Conversion Tracking
                <CircleHelp className="size-3.5 text-muted-foreground/70" aria-hidden="true" />
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={tracking}
                aria-label="Conversion Tracking"
                onClick={() => setTracking((v) => !v)}
                className={cn(
                  "relative h-5 w-9 shrink-0 rounded-full border transition-colors",
                  tracking ? "border-brand/40 bg-brand/80" : "border-border bg-secondary",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-3.5 rounded-full bg-foreground transition-all",
                    tracking ? "left-[18px]" : "left-0.5",
                  )}
                />
              </button>
            </div>

            <div className="h-px w-full bg-border" />

            <div className="flex flex-wrap items-center gap-2">
              <Chip icon={Link2} label="UTM" />
              <Chip icon={Crosshair} label="Targeting" />
              <Chip icon={CalendarClock} label="Expiration" />
              <Chip icon={Lock} label="Password" />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5 p-5">
            <div className="flex items-start justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 -mt-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" strokeWidth={2} />
              </button>
            </div>

            {/* Folder */}
            <div className="flex flex-col gap-2">
              <FieldLabel hint>Folder</FieldLabel>
              <button
                type="button"
                className="flex w-full items-center gap-2.5 rounded-lg border border-border bg-input px-2.5 py-2 text-left transition-colors hover:border-ring"
              >
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#1c2b1c" }}
                >
                  <Folder className="size-3.5" strokeWidth={2} style={{ color: "#04c40a" }} />
                </span>
                <span className="flex-1 text-[13px] text-foreground">Links</span>
                <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
              </button>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <FieldLabel>Description</FieldLabel>
              <textarea
                rows={4}
                placeholder="Add a short description here..."
                aria-label="Description"
                className={cn(inputBase, "resize-none leading-relaxed")}
              />
            </div>

            <div className="mt-auto h-px w-full bg-border" />

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-border/80 px-4 py-2 text-[13px] font-medium text-foreground transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1f1f1f" }}
            >
              <CornerDownLeft className="size-3.5" strokeWidth={2} aria-hidden="true" />
              Create link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
