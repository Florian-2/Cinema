import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	opacity?: number;
};

export function Overlay({ children, opacity }: Props) {
	return (
		<div
			className={`absolute z-10 w-full h-full before:block before:absolute before:z-50 before:top-0 before:left-0 before:w-full before:h-full ${
				opacity ? `before:bg-black/${opacity}` : "before:bg-black/20"
			}`}
		>
			{children}
		</div>
	);
}
