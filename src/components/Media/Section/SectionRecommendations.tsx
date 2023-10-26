import { Movie, Serie } from "@/shared/interfaces";
import { SearchParams, getMedias } from "@/services";
import { HeaderSection } from "./HeaderSection";
import { MediaCard } from "../MediaCard";
import { Slider } from "../Slider";
import { subYears } from "date-fns";
import { TitleSection } from "./TitleSection";

type Props = {
	media: Movie | Serie;
	type: "movie" | "tv";
};

export async function SectionRecommendations({ media, type }: Props) {
	const genres: string = media.genres
		.map((genre) => genre.id)
		.slice(0, 3)
		.join(",");
	const params: SearchParams = [
		{ key: "primary_release_date.gte", value: subYears(new Date(), 10).toJSON() },
		{ key: "watch_region", value: "fr" },
		{ key: "vote_average.gte", value: "6" },
		{ key: "vote_count.gte", value: "200" },
		{ key: "with_genres", value: genres },
	];
	const { results } = await getMedias<{ results: Movie[] | Serie[] }>(`/discover/${type}`, params);
	const medias = results.filter((m) => media.id !== m.id);

	if (!results.length) {
		return <p>Aucune recommandation disponible...</p>;
	}

	const seriesElement = medias.map((media) => (
		<MediaCard
			key={media.id}
			type={type}
			media={media}
			className="mx-4"
		/>
	));

	return (
		<section>
			<HeaderSection>
				<TitleSection>Recommendations</TitleSection>
			</HeaderSection>

			<Slider data={seriesElement} />
		</section>
	);
}
