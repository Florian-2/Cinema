"use client";

import { ThemeSwitcher } from "@/components/Themes/ThemeSwitcher";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";

export function Header() {
	return (
		<header className="max-w-screen-2xl mx-auto flex flex-col justify-center items-center gap-2 mt-3 sm:flex-row sm:justify-between">
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

					<NavigationMenuItem>
						<Link
							href="/series"
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>Animations</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<ThemeSwitcher />
		</header>
	);
}
