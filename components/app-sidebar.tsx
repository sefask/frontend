"use client"

import * as React from "react"
import {
  Bell,
  Command,
  Compass,
  FileCheck,
  FileQuestionMark,
  Settings2,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Compass,
      isActive: true,
    },
    {
      title: "Tests",
      url: "#",
      icon: FileQuestionMark,
      items: [
        {
          title: "All tests",
          url: "#",
        },
        {
          title: "Create new test",
          url: "#",
        },
      ],
    },
    {
      title: "Responses",
      url: "#",
      icon: FileCheck,
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
      count: 12,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="">
                <div className="bg-primary flex aspect-square size-8 items-center justify-center">
                  <User className="size-4 text-primary-foreground" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Sefask</span>
                  <span className="truncate text-xs">Personal account</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
