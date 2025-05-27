'use client'
import { usePathname } from "next/navigation"; 
import { SidebarFooter, SidebarHeader, useSidebar } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { items, navItems } from "../data"
import Link from "next/link"
import User from "./User"
import { cn } from "@/lib/utils" 

export function AppSidebar() {
  const pathname = usePathname(); 
  
  return (
    <Sidebar className="shadow-md">
      <SidebarHeader>
        <h1 className="text-blue-400 text-xl font-medium">LOGO</h1>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url; 
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2", 
                          isActive 
                            ? "bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-100" 
                            : "hover:bg-blue-100 dark:hover:bg-blue-900" 
                        )}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <User/>
      </SidebarFooter>
    </Sidebar>
  )
}