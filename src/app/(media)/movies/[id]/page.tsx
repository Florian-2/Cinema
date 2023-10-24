import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Rating } from "@/components/Media/MediaCard/Rating";
import { Trailer } from "@/components/Media/Trailer";
import { Overlay } from "@/components/Media/MediaCard";
import { Movie, ReleaseDates } from "@/interfaces";
import { getMedias } from "@/services";
import { CreditsList } from "@/components/Media/Credits";
import { SkeletonCredit } from "@/components/Skeletons/SkeletonCredits";
import { Description } from "@/components/Media/Description";
import { Genres } from "@/components/Media/Genres";
import { Thumbnail } from "@/components/Media/Thumbnail";
import { HeaderSection } from "@/components/Media/Section";
import { SectionRecommendations } from "@/components/Media/Section";
import { TitleSection } from "@/components/Media/Section";
import { SectionContainer } from "../../components/SectionContainer";
import { Presentation } from "../../components/Prensations";
import { PresentationContent } from "../../components/PresantationContent";
import { PresentationHeader } from "../../components/PrensationHeader";

export default async function MoviesPage({ params }: { params: { id: string } }) {
	let movie: Movie;
	let trailer: { key: string };
	let releaseDatesFr: string | Date;

	try {
		const data = await Promise.all([
			getMedias<Movie>(`/movie/${params.id}`),
			getMedias<{ results: { key: string }[] }>(`/movie/${params.id}/videos`),
			getMedias<{ results: ReleaseDates[] }>(`/movie/${params.id}/release_dates`),
		]);

		movie = data[0];
		trailer = data[1].results[0];

		const releaseDates = data[2].results.find((date) => date.iso_3166_1 === "FR");
		releaseDatesFr = releaseDates?.release_dates[0].release_date || movie.release_date;
	} catch (error) {
		notFound();
	}

	return (
		<>
			<SectionContainer>
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

				<Presentation>
					{movie.poster_path && (
						<Thumbnail
							url={movie.poster_path}
							alt={movie.title}
						/>
					)}

					<PresentationContent>
						<PresentationHeader
							title={movie.title}
							releaseDate={releaseDatesFr}
							runtime={movie.runtime}
						/>

						<Rating
							rating={movie.vote_average}
							votes={movie.vote_count}
							sizeIcon={40}
						/>

						<Description
							tagline={movie.tagline}
							overview={movie.overview}
						/>

						<Genres genres={movie.genres} />

						{trailer && (
							<Suspense fallback={<span>Chargement...</span>}>
								{trailer && <Trailer ytId={trailer.key} />}
							</Suspense>
						)}
					</PresentationContent>
				</Presentation>
			</SectionContainer>

			<section>
				<HeaderSection>
					<TitleSection>Casting</TitleSection>
				</HeaderSection>

				<Suspense fallback={<SkeletonCredit elements={7} />}>
					<CreditsList
						mediaId={movie.id}
						type="movie"
					/>
				</Suspense>
			</section>

			<SectionRecommendations
				media={movie}
				type="movie"
			/>
		</>
	);
}
