export function formatDate(date: string, dateStyle: "full" | "long" | "medium") {
	const releaseDate = new Date(date);

	const intl = new Intl.DateTimeFormat("fr", { dateStyle });

	return intl.format(releaseDate);
}

export function convertRuntime(time: number) {
	const hours = Math.floor(time / 60);
	const minutes = time % 60;

	return `${hours}h ${minutes}m`;
}
