"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import { usePwaInstall } from "@/hooks/use-pwa-install";
import { Bell, BrainCircuit, Download, History, LogOut, Swords } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";

export function AppSidebar() {
  const { connected, connect, disconnect, publicKey } = useSimulatedWallet();
  const { canInstall, triggerInstall } = usePwaInstall();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Game", icon: Swords },
    { href: "/history", label: "Match History", icon: History },
    { href: "/marketing", label: "Marketing AI", icon: BrainCircuit },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo />
          <div className="flex flex-col">
            <h2 className="font-headline text-lg leading-tight">Citadel Coin</h2>
            <p className="text-xs text-muted-foreground">Rune Flip Game</p>
          </div>
          <div className="flex-1" />
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
         {canInstall && (
          <Button variant="ghost" onClick={triggerInstall}>
            <Download />
            <span>Install App</span>
          </Button>
        )}
        {connected ? (
          <div className="flex flex-col gap-2">
             <div className="group/menu-item relative">
                <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                    <Bell />
                    <span>Notifications</span>
                    <Badge variant="destructive" className="absolute right-2 top-1/2 -translate-y-1/2 group-data-[collapsible=icon]:hidden">3</Badge>
                </Button>
            </div>
            <div className="rounded-md border p-2 text-sm">
              <div className="font-mono text-xs truncate" title={publicKey || ""}>{publicKey}</div>
              <Button variant="ghost" size="sm" className="w-full justify-center mt-2" onClick={disconnect}>
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={connect} className="w-full bg-primary/80 hover:bg-primary">
            Connect Wallet
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
