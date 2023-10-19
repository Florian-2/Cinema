import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function HeaderSection({ children }: Props) {
	return <header className="flex justify-between items-end mb-5">{children}</header>;
}
