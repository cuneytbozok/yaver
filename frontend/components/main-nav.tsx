"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNav() {
  const pathname = usePathname()
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Agents</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/agents"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Marketing Agents
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Create and manage AI-powered marketing agents
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <Link href="/agents/create" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="text-sm font-medium leading-none">Create Agent</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Create a new marketing agent
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/agents/list" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="text-sm font-medium leading-none">View Agents</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Browse all marketing agents
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Campaigns</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <Link href="/campaigns/create" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="text-sm font-medium leading-none">Create Campaign</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Create a new marketing campaign
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/campaigns/list" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="text-sm font-medium leading-none">View Campaigns</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Browse all marketing campaigns
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
} 