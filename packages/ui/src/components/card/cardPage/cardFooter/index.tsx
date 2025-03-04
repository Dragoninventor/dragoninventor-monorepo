import React, { ReactNode } from "react";

export const CardFooter = ({ children }: { children?: ReactNode }) => {
	return (
		<div className={"mt-auto flex w-full justify-center"}>
			<div className={"mt-12 flex w-full max-w-2xl"}>
				<footer
					className={`flex w-full flex-col items-center border-t border-gray-200 pt-12 !text-gray-800`}
				>
					{children}
				</footer>
			</div>
		</div>
	);
};
