export type SearchParams = {
	key: string;
	value: string;
}[];

export async function getMedias<TData>(path: string, params: SearchParams = []): Promise<TData> {
	try {
		const { TMDB_API_URL, TMDB_API_KEY } = process.env;

		if (!TMDB_API_URL || !TMDB_API_KEY) {
			throw new Error("Variables d'environnement introuvables");
		}

		const url = new URL(`${TMDB_API_URL}${path}`);
		url.searchParams.append("api_key", TMDB_API_KEY);
		url.searchParams.append("language", "fr-FR");
		url.searchParams.append("region", "fr");

		params
			.filter((param) => param.value)
			.forEach((param) => {
				url.searchParams.append(param.key, param.value);
			});

		const res = await fetch(url);
		if (!res.ok) {
			throw new Error("Échec de la récupération des données");
		}

		const data: TData = await res.json();

		return data;
	} catch (e) {
		console.log(e);
		throw e;
	}
}

type Response<TResults> = {
	page: number;
	results: TResults;
	total_pages: number;
	total_results: number;
};

export async function fetchMediaPagination<T>(
	category: "movie" | "tv",
	page: number,
	params: SearchParams
): Promise<Response<T>> {
	const res = await fetch(`http://localhost:3000/api/discover/${category}`, {
		method: "POST",
		body: JSON.stringify([{ key: "page", value: page }, ...params]),
	});
	const data = await res.json();

	return data;
}
