"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useEffect } from "react"
import useFetch from "@/utils/useFetch"
import { useSignout } from "@/utils/useSignout"
import { Spinner } from "./ui/spinner"
import { Skeleton } from "./ui/skeleton"

export function NavUser() {
  const { isMobile } = useSidebar()
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

  const { data, fetchData } = useFetch();
  useEffect(() => {
    const fetchUser = async () => {
      fetchData('/api/auth/me')
    }

    fetchUser();
  }, [])

  const { handleSignout, loading: loggingOut } = useSignout();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          {!data ? <div className="p-2">
            <div className="flex items-center w-full gap-2">
              <Skeleton className="min-w-8 h-8 rounded-none" />
              <div className="space-y-0.5 w-full">
                <Skeleton className="h-3.5 w-2/4 rounded-none" />
                <Skeleton className="h-3.5 w-10/12 rounded-none" />
              </div>
            </div>
          </div> :
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-background font-medium">{data?.firstName[0]}{data?.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{data?.firstName}</span>
                    <span className="truncate text-xs">{data?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-none"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-background font-medium">{data?.firstName[0]}{data?.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{data?.firstName}</span>
                      <span className="truncate text-xs">{data?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You&apos;ll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignout}
              disabled={loggingOut}
              className="bg-primary text-background hover:bg-primary/90"
            >
              {loggingOut ?
                <div className="flex gap-2 items-center text-black">
                  <Spinner />
                  <span className="text-black">Signing out...</span>
                </div>
                :
                <span>Sign out</span>
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
