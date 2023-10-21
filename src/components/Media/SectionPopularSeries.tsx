import { SerieLight } from "@/interfaces";
import { getMedias } from "@/services";
import { HeaderSection } from "./HeaderSection";
import Link from "next/link";
import { Slider } from "./Slider";
import { MediaCard } from "./MediaCard/MediaCard";

export async function PopularSeries() {
	const data = await getMedias<{ results: SerieLight[] }>("/tv/popular");
	const series = data.results.splice(0, 10);

	const seriesElement = series.map((media) => (
		<MediaCard
			key={media.id}
			type="serie"
			media={media}
			className="mx-4"
		/>
	));

	return (
		<section>
			<HeaderSection>
				<h2 className="text-1.5xl font-medium">Les Séries du moment</h2>
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
