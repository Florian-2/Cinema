"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Credit as CreditInterface } from "@/interfaces";
import { Credit } from "./Credit";
import { Button } from "@/components/ui/button";

type Props = {
	credits: CreditInterface[];
};

export function MoreCredits({ credits }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="whitespace-nowrap">En voir plus</Button>
			</DialogTrigger>

			<DialogContent className="h-[600px] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="mb-3">Casting complet</DialogTitle>

					<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
						{credits.map((person) => (
							<Credit
								key={person.id}
								person={person}
							/>
						))}
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
