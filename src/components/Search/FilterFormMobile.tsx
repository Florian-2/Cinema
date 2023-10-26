"use client";

import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FilterForm } from "./FilterForm";
import { X } from "lucide-react";

export function FilterFormMobile() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="w-full">Filtres</Button>
			</PopoverTrigger>

			<PopoverContent className="w-screen">
				<div className="flex justify-end">
					<PopoverClose>
						<X />
					</PopoverClose>
				</div>

				<FilterForm />
			</PopoverContent>
		</Popover>
	);
}
