import { MovieLight, SerieLight } from "@/shared/interfaces";
import { ResultMediaCard } from "../Media/MediaCard/SearchResults/ResultMediaCard";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

type Props = {
	type: "movie" | "tv";
	results: MovieLight[] | SerieLight[];
};

export function SearchResults({ type, results }: Props) {
	return (
		<ScrollArea className="h-[400px]">
			{results.map((media) => (
				<div key={media.id}>
					<ResultMediaCard
						media={media}
						type={type}
					/>

					<Separator />
				</div>
			))}
		</ScrollArea>
	);
}
