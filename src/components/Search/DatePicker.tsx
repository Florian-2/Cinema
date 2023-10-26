"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fr } from "date-fns/locale";
import { FormControl } from "../ui/form";

type Props = {
	onChange: () => void;
	value: Date;
	defaultDate?: Date;
};

export function DatePicker({ onChange, value, defaultDate }: Props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant={"outline"}
						className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
					>
						{value && format(value, "dd-MM-yyyy")}
						<CalendarIcon className="ml-auto h-4 w-4" />
					</Button>
				</FormControl>
			</PopoverTrigger>

			<PopoverContent
				align="start"
				className="w-auto p-0"
			>
				<Calendar
					mode="single"
					captionLayout="dropdown-buttons"
					defaultMonth={defaultDate}
					locale={fr}
					selected={value}
					onSelect={onChange}
					fromYear={1970}
					toYear={new Date().getFullYear()}
				/>
			</PopoverContent>
		</Popover>
	);
}
