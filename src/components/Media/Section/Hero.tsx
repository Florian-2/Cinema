import { Overlay } from "@/components/Media/MediaCard";
import { Button } from "@/components/ui/button";
import { MovieLight } from "@/interfaces";
import { subtractDate } from "@/lib/time";
import { SearchParams, getMedias } from "@/services";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86_400; // 1 jour

export async function HeroSection() {
	console.log(subtractDate(6, "month"));

	const params: SearchParams = [
		{ key: "region", value: "fr" },
		{ key: "primary_release_date.gte", value: subtractDate(6, "month") },
		{ key: "sort_by", value: "popularity.desc" },
		{ key: "vote_average.gte", value: "7" },
		{ key: "vote_count.gte", value: "500" },
	];
	const { results: movies } = await getMedias<{ results: MovieLight[] }>("/discover/movie", params);

	const randomNumber = Math.floor(Math.random() * movies.length);
	const movie: MovieLight = movies[randomNumber];

	const imgUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/original/${movie.backdrop_path}`;

	return (
		<section className="relative rounded-3xl shadow-xl overflow-hidden">
			<div className="h-80 sm:h-[400px]">
				<Overlay>
					<Image
						src={imgUrl}
						alt={movie.title}
						fill
						className="object-cover object-center-top"
					/>
				</Overlay>
			</div>

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
