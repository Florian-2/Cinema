import { formSchemaType } from "@/shared/validator";

export function convertToUrl(type: "movie" | "tv", data: formSchemaType): URLSearchParams {
	const searchParams = new URLSearchParams();

	searchParams.append("sort_by", data.sortBy);

	if (type === "movie") {
		searchParams.append("primary_release_date.gte", data.fromDate.toJSON());
		searchParams.append("primary_release_date.lte", data.toDate.toJSON());
	} else {
		searchParams.append("first_air_date.gte", data.fromDate.toJSON());
		searchParams.append("first_air_date.lte", data.toDate.toJSON());
	}

	const [voteAverageMin, voteAverageMax] = data.voteAverage as [number, number];
	const voteCountMin = data.voteCount as [number];
	searchParams.append("vote_average.gte", voteAverageMin.toString());
	searchParams.append("vote_average.lte", voteAverageMax.toString());
	searchParams.append("vote_count.gte", voteCountMin.toString());

	if (data.genres.length > 0) {
		searchParams.append("with_genres", data.genres.join(","));
	}

	return searchParams;
}
