import { MediaCard } from "@/components/Media/MediaCard";
import { FilterForm } from "@/components/Search/FilterForm";

import { MovieLight } from "@/shared/interfaces";
import { getMedias, SearchParams } from "@/services";
import { FilterFormMobile } from "@/components/Search/FilterFormMobile";

type Params = {
	searchParams: {
		sort_by: string;
		"primary_release_date.gte": string;
		"primary_release_date.lte": string;
		"vote_average.gte": string;
		"vote_average.lte": string;
		"vote_count.gte": string;
		with_genres: string;
	};
};

export default async function MoviesPage({ searchParams }: Params) {
	const params: SearchParams = Object.entries(searchParams).map(([key, value]) => ({ key, value }));

	const { results: movies } = await getMedias<{ results: MovieLight[] }>("/discover/movie", params);

	return (
		<section className="grid grid-cols-1 gap-14 md:grid-cols-20/100">
			<div className="mx-auto w-52 md:hidden">
				<FilterFormMobile />
			</div>

			<div className="hidden md:inline-flex">
				<FilterForm />
			</div>

			<div className="flex-grow grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{movies.map((media) => (
					<MediaCard
						key={media.id}
						type="movie"
						media={media}
					/>
				))}
			</div>
		</section>
	);
}
