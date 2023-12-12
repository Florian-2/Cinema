"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchParams, fetchMediaPagination } from "@/services";
import { SerieLight } from "@/shared/interfaces";
import { MediaCard } from "@/components/Media/MediaCard";
import { Loader } from "@/components/ui/loader";
import { MoreResults } from "@/components/Search/ui/MoreResults";
import { ResetSearch } from "@/components/Search/ResetSearch";
import { Form } from "@/components/Search/Form";

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

const MAX_PAGES = 500; // Nombre maximal de pages récupérables depuis l'api TMDB

export default function SeriesPage({ searchParams }: Params) {
	const params: SearchParams = Object.entries(searchParams).map(([key, value]) => ({ key, value }));

	const { data, fetchNextPage, isFetching, isLoading, isError, hasNextPage } = useInfiniteQuery({
		queryKey: ["series", params],
		queryFn: ({ pageParam }) => fetchMediaPagination<SerieLight[]>("tv", pageParam, params),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.page >= MAX_PAGES) {
				return undefined;
			}

			if (lastPage.results.length >= 20) {
				return lastPage.page + 1;
			}

			return undefined;
		},
	});
	const nbOfResults = data?.pages.slice(-1).at(0)?.results.length;
	const pages = data?.pages;

	return (
		<section className="grid grid-cols-1 gap-14 md:grid-cols-20/100">
			<Form type="tv" />

			<div className="max-h-screen overflow-y-auto no-scrollbar mb-5 flex-grow grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{isError && (
					<h2 className="text-lg col-span-4 self-center text-center text-destructive">
						Une erreur est survenue lors de la récupération des données
					</h2>
				)}

				{isLoading ? (
					<Loader />
				) : (
					<>
						{nbOfResults ? (
							<>
								{pages?.map((page) =>
									page.results?.map((media) => (
										<MediaCard
											key={media.id}
											type="tv"
											media={media}
										/>
									))
								)}

								{hasNextPage && (
									<MoreResults
										onClick={() => fetchNextPage()}
										isLoading={isFetching}
									/>
								)}
							</>
						) : (
							<ResetSearch />
						)}
					</>
				)}
			</div>
		</section>
	);
}
