"use client";

import { useAction } from "next-safe-action/hook";

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { searchMedia } from "@/actions/searchMedia";

export function Search() {
	const { execute, result } = useAction(searchMedia);

	function search(formData: FormData) {
		const inputValue = formData.get("search") as string;

		if (!inputValue) return;

		execute({ category: "movie", query: inputValue });
	}

	return (
		<form action={search}>
			<div
				className={
					"flex items-center gap-1 rounded-md border p-1 ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2"
				}
			>
				<Button
					variant="ghost"
					className="px-3 cursor-pointer"
					formAction={search}
				>
					<SearchIcon
						width={20}
						height={20}
					/>
				</Button>

				<Input
					name="search"
					placeholder="Rechercher..."
					className="border-none bg-transparent p-0 placeholder:text-muted-foreground focus-visible:ring-transparent focus-visible:bg-transparent"
				/>
			</div>

			<div>
				{result.data?.map((media) => (
					<p key={media.id}>{media.id}</p>
				))}
			</div>
		</form>
	);
}
