type Props = {
	tagline: string | undefined;
	overview: string | undefined;
};

export function Description({ overview, tagline }: Props) {
	if (!tagline && !overview) {
		return;
	}

	return (
		<div className="flex flex-col gap-1">
			{tagline && <p className="font-medium text-lg">{tagline}</p>}
			<p className="line-clamp-3 text-base text-white/95 hover:line-clamp-none">{overview}</p>
		</div>
	);
}
