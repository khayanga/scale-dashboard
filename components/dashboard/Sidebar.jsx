"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import from next/navigation
import { navItems } from '@/data';

import { Scale, Map, Activity, Table } from "lucide-react";
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";


const Sidebar = () => {
  const location = usePathname();
  
  const navigationItems = [
    {
      title: "Dashboard",
      icon: Activity,
      path: "/",
    },
    {
      title: "Map View",
      icon: Map,
      path: "/map",
    },
    {
      title: "Scale List",
      icon: Table,
      path: "/scales",
    },
  ];

  return (
    <SidebarComponent variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <span>WeighScale Monitor</span>
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* <SidebarFooter>
        <div className="p-2 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </SidebarFooter> */}
    </SidebarComponent>
  );
};

export default Sidebar;
