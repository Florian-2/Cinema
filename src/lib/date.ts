export function formatDate(date: string, dateStyle: "full" | "long" | "medium") {
	const releaseDate = new Date(date);

	const intl = new Intl.DateTimeFormat("fr", { dateStyle });

	return intl.format(releaseDate);
}
