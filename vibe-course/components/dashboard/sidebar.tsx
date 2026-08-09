"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  BarChart3,
  Users,
  Handshake,
  Wallet,
  Settings,
  HelpCircle,
  Link2,
  ChevronDown,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const mainNavItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Customers", href: "/customers" },
]

const secondaryNavItems = [
  { icon: Handshake, label: "Partners", href: "/partners", badge: "New" },
  { icon: Wallet, label: "Payouts", href: "/payouts" },
]

const bottomNavItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help Centre", href: "/help" },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("/")

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border" style={{ backgroundColor: "#101011" }}>
      {/* Account Management */}
      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-sidebar-accent">
            <Avatar className="size-9 rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                John Doe
              </p>
              <p className="truncate text-xs text-muted-foreground">
                john@example.com
              </p>
            </div>
            <ChevronDown className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Link Integrations */}
      <div className="px-4 pb-2">
        <Link
          href="/integrations"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <Link2 className="size-4" />
          <span>Link Integrations</span>
        </Link>
      </div>

      <div className="px-4">
        <Separator className="bg-border" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveItem(item.href)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                activeItem === item.href
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <Separator className="my-4 bg-border" />

        <div className="space-y-1">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveItem(item.href)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                activeItem === item.href
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
              {item.badge && (
                <span 
                  className="ml-auto rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: "#1c2b1c", color: "#04c40a" }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4">
        <Separator className="mb-4 bg-border" />
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveItem(item.href)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                activeItem === item.href
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
