'use client';

import React, { useEffect, useState } from 'react';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  Wallet,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronsUpDown,
  Bell,
} from 'lucide-react';

interface BrandSettings {
  companyName?: string;
  companyLogo?: string;
  brandBackgroundColor?: string;
  brandButtonColor?: string;
  brandTextColor?: string;
}

const mainNavItems = [
  { title: 'Dashboard', url: '/affiliate', icon: LayoutDashboard },
  { title: 'Referrals', url: '/affiliate/referrals', icon: Users },
  { title: 'Payouts', url: '/affiliate/payouts', icon: Wallet },
  { title: 'Resources', url: '/affiliate/resources', icon: BookOpen },
  { title: 'Reports', url: '/affiliate/reports', icon: BarChart3, badge: 'BETA' },
];

const accountNavItems = [
  { title: 'Settings', url: '/affiliate/settings', icon: Settings },
];

function AffiliateSidebar({ brand }: { brand: BrandSettings }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (url: string) => {
    if (url === '/affiliate') return pathname === '/affiliate';
    return pathname.startsWith(url);
  };

  const accentColor = '#d7e54f';
  const brandName = 'SecOra';

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
                <span className="text-xs text-[#d7e54f] font-medium">Affiliate Portal</span>
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
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {accountNavItems.map((item) => (
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
                <DropdownMenuItem onClick={() => router.push('/affiliate/settings')} className="cursor-pointer">
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

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [brand, setBrand] = useState<BrandSettings>({});

  useEffect(() => {
    fetch('/api/affiliate/branding')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) setBrand(data.settings);
      })
      .catch(() => {});
  }, []);

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

  if (!user || !user.hasAffiliate) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="text-sm text-muted-foreground">Affiliate account required to access this page</p>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AffiliateSidebar brand={brand} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-[#e8f5f0] bg-white px-4">
          <SidebarTrigger className="text-[#0f3f3a] hover:bg-[#f0f5f3] hover:text-[#185c55]" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-[#e8f5f0]" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user.name?.split(' ')[0]}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative hover:bg-[#f0f5f3]">
                <Bell className="h-4 w-4 text-[#0f3f3a]" />
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
