import { addMonths } from "date-fns";
import { z } from "zod";

export const formSchema = z.object({
	genres: z.array(z.number()).default([]),
	fromDate: z.date().default(new Date(1970, 1)),
	toDate: z.date().default(addMonths(new Date(), 1)),
	voteAverage: z.number().array().length(2).default([0, 10]),
	voteCount: z.array(z.number()).length(1).default([100]),
	sortBy: z.string().default("popularity.desc"),
});

export type formSchemaType = z.infer<typeof formSchema>;
