"use client";

import { SearchBar } from "@/components/Search/SeachBar";
import { Search } from "@/components/Search/ui";
import { ThemeSwitcher } from "@/components/Themes/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SearchIcon } from "lucide-react";

import Link from "next/link";

export function Header() {
	return (
		<header className="w-full max-w-screen-2xl flex flex-col justify-center items-center gap-2 mt-3 sm:flex-row sm:justify-between">
			<Link
				href="/"
				className="text-[27px] font-medium"
			>
				Movie+
			</Link>

			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link
							href="/movies"
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>Films</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Link
							href="/series"
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>Séries</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<div className="flex items-center gap-2">
				<Search />

				<ThemeSwitcher />
			</div>
		</header>
	);
}
