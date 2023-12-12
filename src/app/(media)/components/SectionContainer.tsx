import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function SectionContainer({ children }: Props) {
	return (
		<section className="flex flex-shrink-0 relative shadow-xl rounded-2xl overflow-hidden min-h-[300px]">
			{children}
		</section>
	);
}
