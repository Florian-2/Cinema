"use client";

type Props = {
	id: string;
	onClose: () => void;
};

export function YoutubeVideo({ id, onClose }: Props) {
	return (
		<div
			className="flex justify-center items-center fixed top-0 left-0 z-50 w-full h-full bg-black/50"
			onClick={onClose}
		>
			<iframe
				width="80%"
				height="90%"
				src={`https://www.youtube.com/embed/${id}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				className="border-none rounded-lg"
			></iframe>
		</div>
	);
}
