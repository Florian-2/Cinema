import { Button } from "@/components/ui/button";
import { Movie } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export function HeroSection({ movie }: { movie: Movie }) {
	const imgUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/original/${movie.backdrop_path}`;

	return (
		<section className="relative rounded-3xl shadow-xl overflow-hidden">
			<div className="h-96 before:absolute before:top-0 before:bottom-0 before:w-full before:h-full before:bg-black/30 before:z-20">
				<Image
					src={imgUrl}
					alt={movie.title}
					fill
					objectFit="cover"
				/>
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
