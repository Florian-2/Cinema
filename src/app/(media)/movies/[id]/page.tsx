import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Rating } from "@/components/Media/MediaCard/Rating";
import { Badge } from "@/components/ui/badge";
import { Trailer } from "@/components/Media/Trailer";
import { Overlay } from "@/components/Media/MediaCard";
import { Movie } from "@/interfaces";
import { getMedias } from "@/services";
import { convertRuntime, formatDate } from "@/lib/time";
import { CreditsList } from "../components/Credits/CreditsList";
import { SkeletonCredit } from "@/components/Skeletons/SkeletonCredits";
import { HeaderSection } from "@/components/Media/HeaderSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default async function MoviesPage({ params }: { params: { id: string } }) {
	let movie: Movie;
	let trailer: { key: string };

	try {
		const data = await Promise.all([
			getMedias<Movie>(`/movie/${params.id}`),
			getMedias<{ results: { key: string }[] }>(`/movie/${params.id}/videos`),
		]);

		movie = data[0];
		trailer = data[1].results[0];
	} catch (error) {
		notFound();
	}

	return (
		<>
			<section className="flex flex-col relative shadow-xl rounded-2xl overflow-hidden h-full md:min-h-[500px]">
				<Overlay>
					<Image
						src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/original/${movie.backdrop_path}`}
						alt={movie.title}
						fill
						layout="fill"
						draggable={false}
						className="object-cover"
					/>
				</Overlay>

				<div className="flex-grow relative z-20 w-full h-full p-6 flex text-white bg-gradient-overlay md:px-8 lg:px-10 md:flex-row md:gap-8 lg:gap-10 md:items-center md:justify-center">
					<div className="flex-shrink-0">
						<Image
							src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w300/${movie.poster_path}`}
							alt={movie.title}
							width={250}
							height={400}
							className="hidden md:block md:rounded-lg"
						/>
					</div>

					<div className="w-full min-h-full flex flex-col gap-5 ">
						<div>
							<h1 className="text-3xl leading-tight font-semibold ">
								{movie.title}
								<span className="ml-2 text-base align-middle font-normal">
									- {convertRuntime(movie.runtime)}
								</span>
							</h1>
							<p className="text-sm">{formatDate(movie.release_date, "long")}</p>
						</div>

						<Rating
							rating={movie.vote_average}
							votes={movie.vote_count}
							sizeIcon={40}
						/>

						<div className="flex flex-col gap-1">
							{movie.tagline && <p className="font-medium text-lg">{movie.tagline}</p>}
							<p className="line-clamp-3 text-base text-white/95 hover:line-clamp-none">
								{movie.overview}
							</p>
						</div>

						<div className="flex gap-3">
							{movie.genres.map((genre) => (
								<Badge
									key={genre.id}
									className="bg-white text-black"
								>
									{genre.name}
								</Badge>
							))}
						</div>

						{trailer && (
							<Suspense fallback={<span>Chargement...</span>}>
								{trailer && <Trailer ytId={trailer.key} />}
							</Suspense>
						)}
					</div>
				</div>
			</section>

			<section>
				<HeaderSection>
					<h2 className="text-1.5xl font-medium">Casting</h2>
				</HeaderSection>

				<Suspense fallback={<SkeletonCredit element={7} />}>
					<CreditsList movieId={movie.id} />
				</Suspense>
			</section>
		</>
	);
}
