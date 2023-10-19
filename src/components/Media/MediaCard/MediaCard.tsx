// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Rating } from "./Rating";
// import { formatDate } from "@/lib/date";
import { MovieLight, SerieLight } from "@/interfaces";
import { MovieCard } from "./MovieCard";
import { SerieCard } from "./SerieCard";

type Props = {
	type: "movie" | "serie";
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
