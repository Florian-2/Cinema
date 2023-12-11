import { MovieLight, SerieLight } from "@/shared/interfaces";
import { ResultMovieCard } from "./ResultMovieCard";
import { ResultSerieCard } from "./ResultSerieCard";

type Props = {
	type: "movie" | "tv";
	media: MovieLight | SerieLight;
};

export function ResultMediaCard({ type, media }: Props) {
	return type === "movie" ? (
		<ResultMovieCard movie={media as MovieLight} />
	) : (
		<ResultSerieCard serie={media as SerieLight} />
	);
}
