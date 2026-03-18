'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Wallet,
  Mail,
  Settings,
  Sliders,
  BarChart3,
  LogOut,
  ChevronsUpDown,
  Bell,
  KeyRound,
  Activity,
  Ticket,
  FolderOpen,
  FileText,
  UsersRound,
  Layers,
} from 'lucide-react';

const mainNavItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Partners', url: '/admin/partners', icon: Users },
  { title: 'Customers', url: '/admin/customers', icon: UserCheck },
  { title: 'Payouts', url: '/admin/payouts', icon: Wallet },
  { title: 'Invoices', url: '/admin/invoices', icon: FileText },
  { title: 'Emails', url: '/admin/emails', icon: Mail },
];

const marketingNavItems = [
  { title: 'Coupons', url: '/admin/coupons', icon: Ticket },
  { title: 'Resources', url: '/admin/resources', icon: FolderOpen },
  { title: 'Programs', url: '/admin/programs', icon: Layers, badge: 'NEW' },
];

const configNavItems = [
  { title: 'Program Settings', url: '/admin/program-settings', icon: Sliders },
  { title: 'Team Members', url: '/admin/team', icon: UsersRound },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
  { title: 'Reports', url: '/admin/reports', icon: BarChart3 },
  { title: 'API Keys', url: '/admin/api-keys', icon: KeyRound },
  { title: 'API Analytics', url: '/admin/api-analytics', icon: Activity },
];

function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (url: string) => {
    if (url === '/admin') return pathname === '/admin';
    return pathname.startsWith(url);
  };

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-white/10 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-3 py-2">
              <img 
                src="/images/secora_logo.svg" 
                alt="SecOra" 
                className="h-8 w-auto object-contain group-data-[collapsible=icon]:h-6"
              />
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-xs text-[#d7e54f] font-medium">Admin Dashboard</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#d7e54f]/70 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive(item.url)}
                    onClick={() => router.push(item.url)}
                    tooltip={item.title}
                    className={cn(
                      "relative px-3 py-2.5 rounded-lg transition-all duration-200",
                      isActive(item.url)
                        ? "bg-[#d7e54f] text-[#0f3f3a] font-semibold"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      isActive(item.url) ? "scale-110" : ""
                    )} />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-[#d7e54f]/70 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
            Marketing
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {marketingNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive(item.url)}
                    onClick={() => router.push(item.url)}
                    tooltip={item.title}
                    className={cn(
                      "relative px-3 py-2.5 rounded-lg transition-all duration-200",
                      isActive(item.url)
                        ? "bg-[#d7e54f] text-[#0f3f3a] font-semibold"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      isActive(item.url) ? "scale-110" : ""
                    )} />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-[#d7e54f] px-2 py-0.5 text-[10px] font-bold text-[#0f3f3a] group-data-[collapsible=icon]:hidden">
                        {item.badge}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-[#d7e54f]/70 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
            Configure
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {configNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive(item.url)}
                    onClick={() => router.push(item.url)}
                    tooltip={item.title}
                    className={cn(
                      "relative px-3 py-2.5 rounded-lg transition-all duration-200",
                      isActive(item.url)
                        ? "bg-[#d7e54f] text-[#0f3f3a] font-semibold"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      isActive(item.url) ? "scale-110" : ""
                    )} />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="px-3 py-2 hover:bg-white/10 rounded-lg transition-all duration-200 data-[state=open]:bg-white/10"
                >
                  <Avatar className="h-9 w-9 rounded-lg ring-2 ring-[#d7e54f]/50">
                    <AvatarImage src={user?.profilePicture} alt={user?.name} />
                    <AvatarFallback className="rounded-lg bg-[#d7e54f] text-[#0f3f3a] text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-white">{user?.name}</span>
                    <span className="truncate text-xs text-white/60">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4 text-white/60 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white border-[#e8f5f0]"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={() => router.push('/admin/settings')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4 text-[#185c55]" />
                  <span className="text-[#0f3f3a]">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#e8f5f0]" />
                <DropdownMenuItem onClick={() => logout()} className="text-red-600 cursor-pointer focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f3f3a]">
        <div className="text-center">
          <div className="relative mx-auto h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-white/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#d7e54f]" />
          </div>
          <p className="mt-4 text-sm text-white/70">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="text-sm text-muted-foreground">You need admin privileges to access this page</p>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-[#e8f5f0] bg-white px-4">
          <SidebarTrigger className="text-[#0f3f3a] hover:bg-[#f0f5f3] hover:text-[#185c55]" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-[#e8f5f0]" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user.name?.split(' ')[0]}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative hover:bg-[#f0f5f3]">
                <Bell className="h-4 w-4 text-[#0f3f3a]" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
