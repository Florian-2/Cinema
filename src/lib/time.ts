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

export function subtractDate(subtract: number, type: "year" | "month") {
	const limitDate = new Date();

	switch (type) {
		case "year":
			limitDate.setFullYear(limitDate.getFullYear() - subtract);
			break;
		case "month":
			limitDate.setMonth(limitDate.getMonth() - subtract);
			break;

		default:
			break;
	}

	return limitDate.toJSON();
}
