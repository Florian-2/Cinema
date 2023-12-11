type Props = {
	title: string;
	releasYear?: number;
};

export function CardInfos({ title, releasYear }: Props) {
	return (
		<div>
			<p className="font-medium">{title}</p>
			{releasYear && <p className="text-sm">{releasYear}</p>}
		</div>
	);
}
