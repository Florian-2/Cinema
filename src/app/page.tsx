import { HeroSection } from "../components/Media/Section";
import { PopularMovies } from "@/components/Media/Section/SectionPopularMovies";
import { PopularSeries } from "@/components/Media/Section/SectionPopularSeries";

export default async function Home() {
	return (
		<>
			<HeroSection />

			<PopularMovies />

			<PopularSeries />
		</>
	);
}
