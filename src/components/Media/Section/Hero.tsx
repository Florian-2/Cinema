import { Overlay } from "@/components/Media/MediaCard";
import { Button } from "@/components/ui/button";
import { MovieLight } from "@/shared/interfaces";
import { subMonths } from "date-fns";

import { SearchParams, getMedias } from "@/services";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86_400; // 1 jour

export async function HeroSection() {
	const params: SearchParams = [
		{ key: "region", value: "fr" },
		{ key: "primary_release_date.gte", value: subMonths(new Date(), 6).toJSON() },
		{ key: "sort_by", value: "popularity.desc" },
		{ key: "vote_average.gte", value: "7" },
		{ key: "vote_count.gte", value: "500" },
	];
	const { results: movies } = await getMedias<{ results: MovieLight[] }>("/discover/movie", params);

	const randomNumber = Math.floor(Math.random() * movies.length);
	const movie: MovieLight = movies[randomNumber];

	const imgUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/original/${movie.backdrop_path}`;

	return (
		<section className="flex-shrink-0 relative h-[300px] sm:h-[400px] rounded-3xl shadow-xl overflow-hidden">
			<Overlay>
				<Image
					src={imgUrl}
					alt={movie.title}
					fill
					className="object-cover object-center-top"
				/>
			</Overlay>

			<div className="absolute bottom-10 z-30 w-full p-2 flex flex-col items-center gap-8">
				<h2 className="text-2xl text-center font-medium text-white sm:text-3xl">{movie.title}</h2>

				<Button
					asChild
					variant="blur"
				>
					<Link href={`/movies/${movie.id}`}>En savoir plus</Link>
				</Button>
			</div>
		</section>
	);
}
