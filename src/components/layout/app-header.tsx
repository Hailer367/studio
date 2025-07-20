"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "../icons/logo";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import { BrainCircuit, History, Swords, Wallet } from "lucide-react";

const navItems = [
    { href: "/", label: "Game", icon: Swords },
    { href: "/history", label: "History", icon: History },
    { href: "/marketing", label: "AI Oracle", icon: BrainCircuit },
];

export function AppHeader() {
    const pathname = usePathname();
    const { connected, connect, disconnect, publicKey } = useSimulatedWallet();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-7xl items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Logo className="h-8 w-8" />
                    <span className="font-bold inline-block font-headline text-lg">Citadel Coin</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                pathname === item.href
                                    ? "bg-accent text-accent-foreground"
                                    : "hover:bg-transparent hover:underline",
                                "justify-start"
                            )}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    {connected ? (
                        <>
                           <div className="hidden sm:flex items-center justify-center gap-2 rounded-md border bg-secondary px-3 py-1.5 text-sm">
                                <Wallet className="h-4 w-4 text-primary" />
                                <span className="font-mono text-xs" title={publicKey || ""}>{publicKey?.substring(0,10)}...</span>
                            </div>
                            <Button variant="secondary" onClick={disconnect} size="sm">
                                Disconnect
                            </Button>
                        </>
                    ) : (
                        <Button onClick={connect} className="bg-primary/90 hover:bg-primary shadow-sm">
                            Connect Wallet
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
