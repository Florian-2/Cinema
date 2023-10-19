import { notFound } from "next/navigation";
import { MovieDetails } from "@/interfaces";
import { getMedias } from "@/services";

export default async function MoviesPage({ params }: { params: { id: string } }) {
	let movie: MovieDetails;
	let trailer: { key: string };

	try {
		const data = await Promise.all([
			getMedias<MovieDetails>(`/movie/${params.id}`),
			getMedias<{ results: { key: string }[] }>(`/movie/${params.id}/videos`),
		]);

		movie = data[0];
		trailer = data[1].results[0];
	} catch (error) {
		notFound();
	}
}
