export interface MovieLight {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
export interface Movie extends MovieLight {
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	budget: number;
	genres: Array<{
		id: number;
		name: string;
	}>;
	homepage: string;
	imdb_id: string;
	production_companies: Array<{
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	}>;
	production_countries: Array<{
		iso_3166_1: string;
		name: string;
	}>;
	revenue: number;
	runtime: number;
	spoken_languages: Array<{
		english_name: string;
		iso_639_1: string;
		name: string;
	}>;
	status: string;
	tagline: string;
}

export enum Release {
	Premiere = 1,
	TheatricalLiminted = 2,
	Theatrical = 3,
	Digital = 4,
	Physical = 5,
	TV = 6,
}
export interface ReleaseDate {
	certification: string;
	descriptors: [];
	iso_639_1: string;
	note: string;
	release_date: Date;
	type: Release;
}
export interface ReleaseDates {
	iso_3166_1: string;
	release_dates: ReleaseDate[];
}
export interface SerieLight {
	backdrop_path: string | null;
	first_air_date: string;
	genres: {
		id: number;
		name: string;
	}[];
	id: number;
	name: string;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	vote_average: number;
	vote_count: number;
}

export interface Serie extends SerieLight {
	tagline?: string;
	created_by: Array<{
		id: number;
		credit_id: string;
		name: string;
		gender: number;
		profile_path: string | null;
	}>;
	episode_run_time: number[];
	homepage: string;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: {
		id: number;
		overview: string;
		air_date: string;
		episode_number: number;
		episode_type: string;
		production_code: string;
		runtime: number | null;
		season_number: number;
		show_id: number;
		still_path: string | null;
	};
	next_episode_to_air: {
		id: number;
		overview: string;
		air_date: string;
		episode_number: number;
		episode_type: string;
		production_code: string;
		runtime: number | null;
		season_number: number;
		show_id: number;
		still_path: string | null;
	} | null;
	networks: Array<{
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	}>;
	number_of_episodes: number;
	number_of_seasons: number;
	seasons: Array<{
		air_date: string;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string;
		season_number: number;
		vote_average: number;
	}>;
	production_companies: Array<{
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	}>;
	production_countries: Array<{
		iso_3166_1: string;
		name: string;
	}>;
	spoken_languages: Array<{
		english_name: string;
		iso_639_1: string;
		name: string;
	}>;
	status: string;
	type: string;
}

export interface Credit {
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}
