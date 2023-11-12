"use client"

import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

import { Button } from "./button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    disabled={pathname === item.href}
                    variant={pathname === item.href ? "outline" : "default"}
                    className={cn("justify-start")}
                >
                    {item.title}
                </Button>
            ))}
        </nav>
    )
}
