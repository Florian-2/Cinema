import { ReleaseDates } from "@/shared/interfaces";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getLocaleReleaseDate(dates: ReleaseDates[]): Date | undefined {
	const releaseDates = dates.find((date) => date.iso_3166_1 === "FR");
	return releaseDates?.release_dates[0].release_date;
}

export function convertRuntime(time: number): string {
	const hours = Math.floor(time / 60);
	const minutes = time % 60;

	return `${hours}h ${minutes}m`;
}

export function formatCurrency(number: number) {
	const intl = new Intl.NumberFormat("fr", { style: "currency", currency: "USD" });
	return intl.format(number);
}
