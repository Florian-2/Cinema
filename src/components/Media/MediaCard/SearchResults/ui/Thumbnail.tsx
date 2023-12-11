import Image from "next/image";

type Props = {
	src: string;
	alt: string;
};

export function Thumbnail({ src, alt }: Props) {
	if (!src) {
		return <div className="w-[100px] h-[150px] bg-muted rounded"></div>;
	}

	return (
		<Image
			src={src}
			alt={alt}
			width={100}
			height={150}
			className="rounded"
		/>
	);
}
