import { MovieLight } from "@/interfaces";
import { getMedias } from "@/services";
import { HeaderSection } from "./HeaderSection";
import Link from "next/link";
import { Slider } from "./Slider";
import { MediaCard } from "./MediaCard/MediaCard";

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
				<h2 className="text-1.5xl font-medium">Les films du moment</h2>
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
