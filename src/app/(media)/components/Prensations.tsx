import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function Presentation({ children }: Props) {
	return (
		<div className="flex-grow relative z-20 w-full h-full p-6 flex text-white bg-gradient-overlay md:p-10 lg:px-10 md:flex-row md:gap-8 lg:gap-10 md:items-center md:justify-center">
			{children}
		</div>
	);
}
