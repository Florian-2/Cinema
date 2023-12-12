import { MovieOrSerie } from "@/actions/searchMedia";
import { FilterForm } from "./FilterForm";
import { genresMovie, genresSerie } from "@/shared/genres";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
	type: MovieOrSerie;
};

export function Form({ type }: Props) {
	const isMovie = type === "movie";

	return (
		<>
			<div className="mx-auto w-52 md:hidden">
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

						<FilterForm
							type={type}
							genres={isMovie ? genresMovie : genresSerie}
						/>
					</PopoverContent>
				</Popover>
			</div>

			<div className="hidden md:inline-flex">
				<FilterForm
					type={type}
					genres={isMovie ? genresMovie : genresSerie}
				/>
			</div>
		</>
	);
}
