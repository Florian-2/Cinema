import { HeroSection } from "./components/Hero";
import { getMedias } from "@/services";
import { Movie } from "@/interfaces";
import { PopularMovies } from "@/components/Media/SectionPopularMovies";
import { PopularSeries } from "@/components/Media/SectionPopularSeries";

export default async function Home() {
	const movie = await getMedias<Movie>(`/movie/575264`);

	return (
		<main className="flex flex-col gap-14 max-w-screen-2xl mx-auto mt-14">
			<HeroSection movie={movie} />

			<PopularMovies />

			<PopularSeries />
		</main>
	);
}
