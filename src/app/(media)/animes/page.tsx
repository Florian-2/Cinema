type Params = {
	params: { id: string };
};

export default function AnimesPage({ params }: Params) {
	return (
		<section>
			Anime
			{params.id}
		</section>
	);
}
