"use server";

import { z } from "zod";
import { ActionError, action } from "@/lib/safe-action";
import { getMedias } from "@/services";
import { MovieLight, SerieLight } from "@/shared/interfaces";

const movieOrSerie = z.union([z.literal("movie"), z.literal("tv")]);
export type MovieOrSerie = z.infer<typeof movieOrSerie>;

const searchMediaSchema = z.object({
	category: movieOrSerie,
	query: z.string().min(2),
});

export const searchMedia = action(
	searchMediaSchema,
	async <C extends MovieOrSerie>({ category, query }: { category: C; query: string }) => {
		try {
			const params = [{ key: "query", value: query }];
			const media = await getMedias<{ results: C extends "movie" ? MovieLight[] : SerieLight[] }>(
				`/search/${category}`,
				params
			);

			if (!media.results.length) {
				throw new ActionError("Aucun résultat...");
			}

			return media.results;
		} catch (error) {
			const e = error as Error;
			throw new ActionError(e.message);
		}
	}
);
