"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import { SearchBar } from "../SeachBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Search() {
	const [isOpen, setIsOpen] = useState(false);

	const onOpenChange = () => setIsOpen(!isOpen);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
			modal={true}
		>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="p-2"
				>
					<SearchIcon
						width={22}
						height={22}
					/>
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-2xl">
				<SearchBar onOpenChange={onOpenChange} />
			</DialogContent>
		</Dialog>
	);
}
