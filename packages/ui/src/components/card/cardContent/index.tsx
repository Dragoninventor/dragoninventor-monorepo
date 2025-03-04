import React, { ReactNode } from "react";

export const CardContent = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={`flex w-full max-w-2xl flex-col leading-8 sm:px-4 [&_.styledImage:not(:last-child)]:mb-4 [&_p:not(:last-child)]:mb-4 [&_p]:text-gray-700 self-center${
				className ? ` ${className}` : ""
			}`}
		>
			{children}
		</div>
	);
};
