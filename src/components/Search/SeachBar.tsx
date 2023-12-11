"use client";

import { useAction } from "next-safe-action/hook";

import { Loader2, PlusCircle, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { searchMedia, MovieOrSerie } from "@/actions/searchMedia";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useDebounce } from "@/hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";
import { SearchResults } from "./SearchResult";

export function Search() {
	const [searchTerm, setSeachTerm] = useState("");
	const [category, setCategory] = useState<MovieOrSerie>("movie");
	const debounceSearchTerm = useDebounce(searchTerm, 500);
	const { execute, result, status } = useAction(searchMedia);

	function search() {
		if (searchTerm.length >= 2) {
			execute({ category, query: searchTerm });
		}
	}

	useEffect(() => {
		search();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceSearchTerm, category]);

	const searchTermChange = (event: ChangeEvent<HTMLInputElement>) => setSeachTerm(event.target.value);

	const groupValueChange = (value: string) => setCategory(value as MovieOrSerie);

	return (
		<form
			action={search}
			className="space-y-3 mt-6"
		>
			<div className="flex gap-2">
				<Input
					name="search"
					placeholder="Rechercher..."
					className="text-base py-3"
					value={searchTerm}
					onChange={searchTermChange}
				/>

				<Button
					variant="outline"
					className="p-2"
					disabled={status === "executing"}
				>
					{status === "executing" ? (
						<Loader2
							width={22}
							height={22}
							className="animate-spin"
						/>
					) : (
						<SearchIcon
							width={22}
							height={22}
						/>
					)}
				</Button>
			</div>

			<ToggleGroup
				value={category}
				onValueChange={groupValueChange}
				type="single"
				variant="outline"
				className="justify-start gap-2"
			>
				<ToggleGroupItem
					value="movie"
					className="gap-1 text-muted-foreground"
				>
					Film
					<PlusCircle
						width={16}
						height={16}
					/>
				</ToggleGroupItem>

				<ToggleGroupItem
					value="tv"
					className="gap-1 text-muted-foreground"
				>
					Serie
					<PlusCircle
						width={16}
						height={16}
					/>
				</ToggleGroupItem>
			</ToggleGroup>

			{result.serverError && searchTerm.length >= 2 && <p>Aucun résultat</p>}

			{result.data && searchTerm.length >= 2 && (
				<SearchResults
					type={category}
					results={result.data}
				/>
			)}
		</form>
	);
}
