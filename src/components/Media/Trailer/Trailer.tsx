"use client";

import { useState } from "react";
import { YoutubeVideo } from "./YoutubeVideo";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
	ytId: string;
};

export async function Trailer({ ytId }: Props) {
	const [show, setShow] = useState(false);
	const [loaded, setLoaded] = useState(false);

	function handleClick() {
		if (show) return;

		setShow(!show);
		setLoaded(true);
	}

	return (
		<div className="">
			{!show && (
				<Button
					onClick={handleClick}
					variant={"white"}
					className="gap-2 "
				>
					<span className="text-base">Bande-annonce</span>
					<Play size={17} />
				</Button>
			)}

			{show && loaded && (
				<YoutubeVideo
					id={ytId}
					onClose={() => setShow(false)}
				/>
			)}
		</div>
	);
}
