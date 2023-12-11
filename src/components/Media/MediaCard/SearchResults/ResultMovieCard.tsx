import Link from "next/link";
import { MovieLight } from "@/shared/interfaces";
import { CardInfos, Thumbnail, CardContent } from "./ui";

type Props = {
	movie: MovieLight;
};

export function ResultMovieCard({ movie }: Props) {
	const imgSrc = movie.poster_path ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w185/${movie.poster_path}` : "";
	const releasYear = movie.release_date ? new Date(movie.release_date).getFullYear() : undefined;

	return (
		<Link href={`/movies/${movie.id}`}>
			<CardContent>
				<Thumbnail
					src={imgSrc}
					alt={movie.title}
				/>

				<CardInfos
					title={movie.title}
					releasYear={releasYear}
				/>
			</CardContent>
		</Link>
	);
}
