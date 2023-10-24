import { MovieLight, SerieLight } from "@/interfaces";
import { MovieCard } from "./MovieCard";
import { SerieCard } from "./SerieCard";

type Props = {
	type: "movie" | "tv";
	media: MovieLight | SerieLight;
	className?: string;
};

export function MediaCard({ type, media, className }: Props) {
	return type === "movie" ? (
		<MovieCard
			media={media as MovieLight}
			className={className}
		/>
	) : (
		<SerieCard
			media={media as SerieLight}
			className={className}
		/>
	);
}
