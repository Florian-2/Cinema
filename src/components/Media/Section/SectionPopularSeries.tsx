import { SerieLight } from "@/shared/interfaces";
import { SearchParams, getMedias } from "@/services";
import { HeaderSection } from "./HeaderSection";
import Link from "next/link";
import { Slider } from "../Slider";
import { MediaCard } from "../MediaCard/MediaCard";
import { TitleSection } from "./TitleSection";

export async function PopularSeries() {
	const limitDate = new Date();
	limitDate.setFullYear(limitDate.getFullYear() - 10);

	const params: SearchParams = [
		{ key: "first_air_date.gte", value: limitDate.toJSON() },
		{ key: "sort_by", value: "popularity.desc" },
		{ key: "vote_average.gte", value: "7.5" },
		{ key: "vote_count.gte", value: "2000" },
		{ key: "watch_region", value: "fr" },
	];
	const { results: series } = await getMedias<{ results: SerieLight[] }>("/discover/tv", params);

	const seriesElement = series.map((media) => (
		<MediaCard
			key={media.id}
			type="tv"
			media={media}
		/>
	));

	return (
		<section>
			<HeaderSection>
				<TitleSection>Les Séries du moment</TitleSection>

				<Link
					href="/movies"
					className="text-sm underline"
				>
					Tout voir
				</Link>
			</HeaderSection>

			<Slider data={seriesElement} />
		</section>
	);
}
