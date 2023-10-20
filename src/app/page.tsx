import { HeroSection } from "./components/Hero";
import { getMedias } from "@/services";
import { Movie } from "@/interfaces";
import { PopularMovies } from "@/components/Media/SectionPopularMovies";
import { PopularSeries } from "@/components/Media/SectionPopularSeries";

export default async function Home() {
	const movie = await getMedias<Movie>(`/movie/575264`);

	return (
		<>
			<HeroSection movie={movie} />

			<PopularMovies />

			<PopularSeries />
		</>
	);
}
