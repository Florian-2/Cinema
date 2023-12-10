import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { Rating } from "@/components/Media/MediaCard/Rating";
import { Trailer } from "@/components/Media/Trailer";
import { Overlay } from "@/components/Media/MediaCard";
import { KeyString, Movie, ReleaseDates } from "@/shared/interfaces";
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
import { getLocaleReleaseDate } from "@/lib/utils";
import { TabsMovie } from "@/components/Media/Section/Informations";

export default async function MoviesPage({ params }: { params: { id: string } }) {
	let movie: Movie;
	let trailer: KeyString;
	let releaseDatesFr: string | Date;

	try {
		const [movieData, trailerData, releaseData] = await Promise.all([
			getMedias<Movie>(`/movie/${params.id}`),
			getMedias<{ results: KeyString[] }>(`/movie/${params.id}/videos`),
			getMedias<{ results: ReleaseDates[] }>(`/movie/${params.id}/release_dates`),
		]);

		movie = movieData;
		trailer = trailerData.results[0];
		releaseDatesFr = getLocaleReleaseDate(releaseData.results) || movie.release_date;
	} catch (error) {
		notFound();
		// redirect("/");
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

			<section>
				<HeaderSection>
					<TitleSection>Informations</TitleSection>
				</HeaderSection>

				<TabsMovie movie={movie} />
			</section>

			<SectionRecommendations
				media={movie}
				type="movie"
			/>
		</>
	);
}
