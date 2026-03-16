"use client"

import type { ReactNode } from "react"
import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  Home,
} from "lucide-react"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

// Move NavItem outside of Sidebar component
function NavItem({
  href,
  icon: Icon,
  children,
  onClick,
}: {
  href: string
  icon: typeof Home
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
    >
      <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
      {children}
    </Link>
  )
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        title="Toggle sidebar menu"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-background shadow-md"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 z-[70] w-64 bg-background transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:w-64 border-r border-border ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <Link
            href="/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 items-center gap-3 border-b border-border px-6"
          >
            <Image
              src="/logo.png"
              alt="AuthUI-kit"
              width={32}
              height={32}
              className="hidden flex-shrink-0 dark:block"
            />
            <Image
              src="/logo.png"
              alt="AuthUI-kit"
              width={32}
              height={32}
              className="block flex-shrink-0 dark:hidden"
            />
            <span className="text-lg font-semibold text-foreground hover:cursor-pointer">AuthUI-Kit</span>
          </Link>

          {/* Navigation groups */}
          <div className="flex-grow overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Overview */}
              <div>
                <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Overview
                </p>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home} onClick={handleNavigation}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/analytics" icon={BarChart2} onClick={handleNavigation}>
                    Analytics
                  </NavItem>
                  <NavItem href="#" icon={Building2} onClick={handleNavigation}>
                    Visitors
                  </NavItem>
                  <NavItem href="#" icon={Folder} onClick={handleNavigation}>
                    Projects
                  </NavItem>
                </div>
              </div>

              {/* Finance */}
              <div>
                <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Finance
                </p>
                <div className="space-y-1">
                  <NavItem href="#" icon={Wallet} onClick={handleNavigation}>
                    Transactions
                  </NavItem>
                  <NavItem href="#" icon={Receipt} onClick={handleNavigation}>
                    Invoices
                  </NavItem>
                  <NavItem href="#" icon={CreditCard} onClick={handleNavigation}>
                    Payments
                  </NavItem>
                </div>
              </div>

              {/* Team */}
              <div>
                <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Team</p>
                <div className="space-y-1">
                  <NavItem href="#" icon={Users2} onClick={handleNavigation}>
                    Members
                  </NavItem>
                  <NavItem href="#" icon={Shield} onClick={handleNavigation}>
                    Permissions
                  </NavItem>
                  <NavItem href="#" icon={MessagesSquare} onClick={handleNavigation}>
                    Chat
                  </NavItem>
                  <NavItem href="#" icon={Video} onClick={handleNavigation}>
                    Meetings
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-4">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings} onClick={handleNavigation}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle} onClick={handleNavigation}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          role="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-[65] bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}