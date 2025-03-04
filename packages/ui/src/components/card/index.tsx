import React, { CSSProperties, ReactNode } from "react";

export const Card = ({
	children,
	className,
	style,
}: {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}) => {
	return (
		<div
			style={{
				fontFamily: style?.fontFamily
					? style.fontFamily
					: `var(--font-card-default)`,
				...style,
			}}
			className={`rounded bg-slate-100 shadow-md shadow-slate-400/30 ${
				className
					? `${className}`
					: "flex flex-col gap-2.5 px-5 pb-12 pt-8"
			}`}
		>
			{children}
		</div>
	);
};
