import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Rating } from "@/components/Media/MediaCard/Rating";
import { Trailer } from "@/components/Media/Trailer";
import { Overlay } from "@/components/Media/MediaCard";
import { Serie } from "@/shared/interfaces";
import { getMedias } from "@/services";
import { CreditsList } from "@/components/Media/Credits/CreditsList";
import { SkeletonCredit } from "@/components/Skeletons/SkeletonCredits";
import { Genres } from "@/components/Media/Genres";
import { Description } from "@/components/Media/Description";
import { HeaderSection } from "@/components/Media/Section";
import { SectionRecommendations } from "@/components/Media/Section";
import { TitleSection } from "@/components/Media/Section";
import { SectionContainer } from "../../components/SectionContainer";
import { Presentation } from "../../components/Prensations";
import { Thumbnail } from "@/components/Media/Thumbnail";
import { PresentationHeader } from "../../components/PrensationHeader";
import { PresentationContent } from "../../components/PresantationContent";

export default async function SeriePage({ params }: { params: { id: string } }) {
	let serie: Serie;
	let trailer: { key: string };

	try {
		const data = await Promise.all([
			getMedias<Serie>(`/tv/${params.id}`),
			getMedias<{ results: { key: string }[] }>(`/tv/${params.id}/videos`, [
				{ key: "include_video_language", value: "fr" },
			]),
		]);

		serie = data[0];
		trailer = data[1].results[0];
	} catch (error) {
		notFound();
	}

	return (
		<>
			<SectionContainer>
				<Overlay>
					<Image
						src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/original/${serie.backdrop_path}`}
						alt={serie.name}
						fill
						layout="fill"
						draggable={false}
						className="object-cover"
					/>
				</Overlay>

				<Presentation>
					{serie.poster_path && (
						<Thumbnail
							url={serie.poster_path}
							alt={serie.name}
						/>
					)}

					<PresentationContent>
						<PresentationHeader
							title={serie.name}
							releaseDate={serie.first_air_date}
						/>

						<Rating
							rating={serie.vote_average}
							votes={serie.vote_count}
							sizeIcon={40}
						/>

						<Description
							tagline={serie.tagline}
							overview={serie.overview}
						/>

						<Genres genres={serie.genres} />

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
						mediaId={serie.id}
						type="tv"
					/>
				</Suspense>
			</section>

			<SectionRecommendations
				media={serie}
				type="tv"
			/>
		</>
	);
}
