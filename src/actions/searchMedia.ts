"use server";

import { ActionError, action } from "@/lib/safe-action";
import { getMedias } from "@/services";
import { MovieLight, SerieLight } from "@/shared/interfaces";
import { z } from "zod";

type MediaResult<T> = T extends "movie" ? MovieLight[] : T extends "tv" ? SerieLight[] : never;

const searchMediaSchema = z.object({
	category: z.union([z.literal("movie"), z.literal("tv")]),
	query: z.string().min(2),
});

export const searchMedia = action(
	searchMediaSchema,
	async ({ category, query }): Promise<MediaResult<typeof category>> => {
		try {
			const params = [{ key: "query", value: query }];
			const media = await getMedias<{ results: MovieLight[] | SerieLight[] }>(`/search/${category}`, params);

			if (!media.results.length) {
				throw new ActionError("Aucun résultat...");
			}

			return media.results;
		} catch (error) {
			throw new ActionError("Echec");
		}
	}
);
