import Image from "next/image";

type Props = {
	url: string;
	alt: string;
};

export function Thumbnail({ alt, url }: Props) {
	const thumbnailUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w300/${url}`;

	return (
		<div className="flex-shrink-0">
			<Image
				src={thumbnailUrl}
				alt={alt}
				width={250}
				height={400}
				className="hidden md:block md:rounded-lg"
			/>
		</div>
	);
}
