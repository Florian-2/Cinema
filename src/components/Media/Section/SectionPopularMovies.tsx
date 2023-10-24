import { MovieLight } from "@/interfaces";
import { getMedias } from "@/services";
import { HeaderSection } from "./HeaderSection";
import Link from "next/link";
import { Slider } from "../Slider";
import { MediaCard } from "../MediaCard/MediaCard";
import { TitleSection } from "./TitleSection";

export async function PopularMovies() {
	const data = await getMedias<{ results: MovieLight[] }>("/movie/popular");
	const movies = data.results.splice(0, 10);

	const moviesElement = movies.map((media) => (
		<MediaCard
			key={media.id}
			type="movie"
			media={media}
			className="mx-4"
		/>
	));

	return (
		<section>
			<HeaderSection>
				<TitleSection>Les films du moment</TitleSection>

				<Link
					href="/movies"
					className="text-sm underline"
				>
					Tout voir
				</Link>
			</HeaderSection>

			<Slider data={moviesElement} />
		</section>
	);
}
