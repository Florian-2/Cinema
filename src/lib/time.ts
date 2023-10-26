export function formatDate(date: string | Date, dateStyle: "full" | "long" | "medium"): string {
	try {
		const releaseDate = new Date(date);

		const intl = new Intl.DateTimeFormat("fr", { dateStyle });

		return intl.format(releaseDate);
	} catch (error) {
		return "";
	}
}

export function convertRuntime(time: number): string {
	const hours = Math.floor(time / 60);
	const minutes = time % 60;

	return `${hours}h ${minutes}m`;
}
