type SearchParams = {
	key: string;
	value: string;
}[];

// Voir si on peux utiliser les type générique pour typé le retour de la fonction
export async function getMedias<T>(path: string, params: SearchParams = []): Promise<T> {
	try {
		if (typeof process.env.TMDB_API_URL === "undefined" || typeof process.env.TMDB_API_KEY === "undefined") {
			throw new Error("Récupération des données impossible.");
		}

		const url = new URL(`${process.env.TMDB_API_URL}${path}`);
		url.searchParams.append("api_key", process.env.TMDB_API_KEY);
		url.searchParams.append("language", "fr-FR");

		params
			.filter((param) => param.value)
			.forEach((param) => {
				url.searchParams.append(param.key, param.value);
			});

		const res = await fetch(url);
		if (!res.ok) {
			throw new Error("Échec de la récupération des données");
		}

		const data = await res.json();

		return data;
	} catch (e) {
		throw e;
	}
}
