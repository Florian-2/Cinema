import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function SectionContainer({ children }: Props) {
	return (
		<section className="h-full flex flex-col relative shadow-xl rounded-2xl overflow-hidden md:min-h-[500px]">
			{children}
		</section>
	);
}
