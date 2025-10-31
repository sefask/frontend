"use client"

import { SidebarIcon } from "lucide-react"
import React, { useMemo } from "react"
import { usePathname } from "next/navigation"

import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"

function segmentToTitle(segment: string) {
  // handle dynamic segments like [id] or slug
  const cleaned = segment.replace(/\[(.*)\]/, "$1").replace(/[-_]/g, " ")
  return cleaned
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname() || "/"

  const crumbs = useMemo(() => {
    if (!pathname || pathname === "/") return []
    const parts = pathname.split("/").filter(Boolean)
    const items: { href: string; label: string }[] = []
    let href = ""
    for (const part of parts) {
      href += `/${part}`
      items.push({ href, label: segmentToTitle(part) })
    }
    return items
  }, [pathname])

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4 max-md:px-2">
        <Button
          className="h-8 w-8 md:hidden"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            {crumbs.length === 0 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {crumbs.map((c, i) => (
                  <React.Fragment key={c.href}>
                    {i === crumbs.length - 1 ? (
                      <BreadcrumbItem>
                        <BreadcrumbPage>{c.label}</BreadcrumbPage>
                      </BreadcrumbItem>
                    ) : (
                      <BreadcrumbItem>
                        <BreadcrumbLink href={c.href}>{c.label}</BreadcrumbLink>
                      </BreadcrumbItem>
                    )}
                    {i < crumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  )
}
