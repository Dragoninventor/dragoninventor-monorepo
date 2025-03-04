import React, { ReactNode } from "react";
import { Card } from "../index";

export const CardPage = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<Card
			style={{
				fontFamily: `var(--font-cardpage-default)`,
			}}
			className={`flex h-full w-full flex-col items-center px-6 pb-16 pt-12 sm:px-8 md:max-w-7xl [&_h1]:mb-4 [&_h1]:text-2xl ${className ? className : ""}`}
		>
			{children}
		</Card>
	);
};
