export interface Genre {
	id: number;
	label: string;
}

export const genresMovie: Genre[] = [
	{ id: 28, label: "Actions" },
	{ id: 12, label: "Aventure" },
	{ id: 80, label: "Crime" },
	{ id: 35, label: "Comédie" },
	{ id: 10752, label: "Guerre" },
	{ id: 27, label: "Horreur" },
	{ id: 878, label: "Science-Fiction" },
	{ id: 53, label: "Thriller" },
];

export const genresSerie: Genre[] = [
	{ id: 10759, label: "Action & Adventure" },
	{ id: 16, label: "Animation" },
	{ id: 99, label: "Documentary" },
	{ id: 18, label: "Drama" },
	{ id: 80, label: "Crime" },
	{ id: 35, label: "Comédie" },
	{ id: 10751, label: "Family" },
	{ id: 10752, label: "Guerre" },
	{ id: 9648, label: "Mystère" },
	{ id: 10765, label: "Sci-Fi & Fantasy" },
	{ id: 53, label: "Thriller" },
];
