"use server";

import { z } from "zod";
import { ActionError, actionClient } from "@/lib/safe-action";
import { getMedias } from "@/services";
import { MovieLight, SerieLight } from "@/shared/interfaces";

const movieOrSerie = z.union([z.literal("movie"), z.literal("tv")]);
export type MovieOrSerie = z.infer<typeof movieOrSerie>;

const searchMediaSchema = z.object({
	category: movieOrSerie,
	query: z.string().min(2),
});

type MediaResults<T extends MovieOrSerie> = T extends "movie" ? MovieLight[] : SerieLight[];

export const searchMediaAction = actionClient
	.schema(searchMediaSchema)
	.action(async ({ parsedInput: { category, query } }) => {
		try {
			const params = [{ key: "query", value: query }];
			const media = await getMedias<{ results: MediaResults<typeof category> }>(`/search/${category}`, params);

			if (!media.results.length) {
				throw new ActionError("Aucun résultat...");
			}

			return media.results;
		} catch (error) {
			const e = error as Error;
			throw new ActionError(e.message);
		}
	});
