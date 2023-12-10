"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl } from "../ui/form";

type Props = {
	onChange: () => void;
};

export function SelectSortBy({ onChange }: Props) {
	return (
		<Select
			onValueChange={onChange}
			defaultValue="popularity.desc"
		>
			<FormControl>
				<SelectTrigger>
					<SelectValue placeholder="Sélectionner un genre" />
				</SelectTrigger>
			</FormControl>

			<SelectContent>
				<SelectGroup>
					<SelectItem value="popularity.desc">Popularité +/-</SelectItem>
					<SelectItem value="popularity.asc">
						<span>
							<span>
								<span>Popularité </span>
							</span>
						</span>
					</SelectItem>
					<SelectItem value="vote_average.desc">Notes +/-</SelectItem>
					<SelectItem value="vote_average.asc">Note -/+</SelectItem>
					<SelectItem value="primary_release_date.desc">Date de sortie +/-</SelectItem>
					<SelectItem value="primary_release_date.asc">Date de sortie -/+</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
