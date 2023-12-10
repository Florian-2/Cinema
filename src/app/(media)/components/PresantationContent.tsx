import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function PresentationContent({ children }: Props) {
	return <div className="w-full min-h-full flex flex-col justify-center gap-5 ">{children}</div>;
}
