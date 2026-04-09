import { LayoutDashboard, Users, Code, Settings, Key, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const items = [
  { title: "Tổng quan", url: "/admin", icon: LayoutDashboard },
  { title: "Danh mục App Scripts", url: "/admin/app-scripts", icon: Code },
  { title: "Quản lý Khách hàng", url: "/admin/users", icon: Users },
  { title: "Quản lý Giấy phép", url: "/admin/licenses", icon: Key },
  { title: "Cài đặt", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-14 flex items-center px-5 border-b">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm shadow-primary/20">
            <Code className="text-primary-foreground w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight">GAS Hub Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase font-black tracking-widest opacity-50 px-5">Menu quản trị</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className={`h-10 rounded-xl px-3 transition-all ${location.pathname === item.url ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted"}`}
                  >
                    <Link to={item.url}>
                      <item.icon className={`w-4 h-4 ${location.pathname === item.url ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-xs">{item.title}</span>
                      {location.pathname === item.url && <ChevronRight className="ml-auto w-3.5 h-3.5" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t bg-muted/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
            {user?.email?.[0].toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold truncate text-foreground">{user?.email?.split('@')[0]}</span>
            <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-tighter">Quản trị viên</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
