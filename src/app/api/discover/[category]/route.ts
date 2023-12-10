import { getMedias } from "@/services";
import { MovieLight } from "@/shared/interfaces";
import { NextRequest, NextResponse } from "next/server";

type PostParams = {
	params: { category: "movie" | "tv" };
};

export async function POST(request: NextRequest, { params }: PostParams) {
	try {
		const { category } = params;

		if (category !== "movie" && category !== "tv") {
			throw new Error("Paramètre catégorie invalide");
		}

		const searchParams = await request.json();

		const movies = await getMedias<{ results: MovieLight[] }>(`/discover/${category}`, searchParams);

		return NextResponse.json(movies);
	} catch (error) {
		const e = error as Error;

		return new Response(e.message, {
			status: 400,
		});
	}
}
