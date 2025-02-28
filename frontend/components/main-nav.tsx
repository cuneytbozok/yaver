"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

export function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Agents</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[200px]">
              <li>
                <Link href="/agents" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    pathname === "/agents" ? "bg-accent text-accent-foreground" : ""
                  )}>
                    <div className="text-sm font-medium">All Agents</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      View and manage all agents
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/agents/create" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    pathname === "/agents/create" ? "bg-accent text-accent-foreground" : ""
                  )}>
                    <div className="text-sm font-medium">Create Agent</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Create a new agent for simulations
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
            <ul className="grid gap-3 p-4 w-[200px]">
              <li>
                <Link href="/campaigns" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    pathname === "/campaigns" ? "bg-accent text-accent-foreground" : ""
                  )}>
                    <div className="text-sm font-medium">All Campaigns</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      View and manage all campaigns
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/campaigns/create" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    pathname === "/campaigns/create" ? "bg-accent text-accent-foreground" : ""
                  )}>
                    <div className="text-sm font-medium">Create Campaign</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Create a new marketing campaign
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/analytics" legacyBehavior passHref>
            <NavigationMenuLink className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/analytics" ? "text-primary" : "text-muted-foreground"
            )}>
              Analytics
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/debug" legacyBehavior passHref>
            <NavigationMenuLink className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/debug" ? "text-primary" : "text-muted-foreground"
            )}>
              Debug
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/ml-engines" legacyBehavior passHref>
            <NavigationMenuLink className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/ml-engines" ? "text-primary" : "text-muted-foreground"
            )}>
              ML Engines
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
} 