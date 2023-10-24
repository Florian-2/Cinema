import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Rating } from "@/components/Media/MediaCard/Rating";
import { Trailer } from "@/components/Media/Trailer";
import { Overlay } from "@/components/Media/MediaCard";
import { Serie } from "@/interfaces";
import { getMedias } from "@/services";
import { formatDate } from "@/lib/time";
import { CreditsList } from "@/components/Media/Credits/CreditsList";
import { SkeletonCredit } from "@/components/Skeletons/SkeletonCredits";
import { Genres } from "@/components/Media/Genres";
import { Description } from "@/components/Media/Description";
import { HeaderSection } from "@/components/Media/Section";
import { SectionRecommendations } from "@/components/Media/Section";
import { TitleSection } from "@/components/Media/Section";

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
			<section className="flex flex-col relative shadow-xl rounded-2xl overflow-hidden h-full md:min-h-[500px]">
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

				<div className="flex-grow relative z-20 w-full h-full p-6 flex text-white bg-gradient-overlay md:px-8 lg:px-10 md:flex-row md:gap-8 lg:gap-10 md:items-center md:justify-center">
					<div className="flex-shrink-0">
						<Image
							src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w300/${serie.poster_path}`}
							alt={serie.name}
							width={250}
							height={400}
							className="hidden md:block md:rounded-lg"
						/>
					</div>

					<div className="w-full min-h-full flex flex-col gap-5 ">
						<div className="flex flex-col">
							<h1 className="text-3xl leading-tight font-semibold ">{serie.name}</h1>
							<p className="text-sm self-start cursor-default">
								{formatDate(serie.first_air_date, "long")} (saison 1)
							</p>
						</div>

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
					</div>
				</div>
			</section>

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
