"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";
type Props = {
	ytId: string;
};

export async function Trailer({ ytId }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={"white"}
					className="self-start gap-2"
				>
					<span className="text-base">Bande-annonce</span>
					<Play size={17} />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-6xl h-max">
				<DialogHeader>
					<DialogDescription>
						<AspectRatio
							ratio={16 / 9}
							className="mt-3"
						>
							<iframe
								src={`https://www.youtube.com/embed/${ytId}`}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
								className="border-none rounded-lg w-full h-full"
							></iframe>
						</AspectRatio>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
