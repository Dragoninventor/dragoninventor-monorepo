"use client";

import { Fragment, ReactNode } from "react";
import { StaticImageData } from "next/image";
import StyledImage from "@/components/image";

const ProjectCard = ({
	name,
	description,
	image,
	links,
}: {
	name: ReactNode;
	description: ReactNode;
	image: {
		src: StaticImageData;
		alt: string;
	};
	links?: ReactNode[];
}) => {
	return (
		<>
			<li
				className={
					"flex w-full rounded border border-gray-200 bg-slate-50 px-1.5 pb-2.5 pt-1.5"
				}
			>
				<StyledImage
					src={image.src}
					alt={image.alt}
					wrapperClassName={"aspect-square w-1/2 self-start sm:w-1/3"}
				/>
				<div
					className={
						"ml-4 mt-1.5 flex w-1/2 flex-col sm:mt-2.5 sm:w-2/3 md:mt-2.5"
					}
				>
					<h2 className={"text-md mb-0.5 text-gray-900"}>{name}</h2>
					<h3 className={"text-sm text-gray-700"}>{description}</h3>
					<div className={"flex flex-col items-start gap-1.5 pt-2.5"}>
						{links?.map((link, index) => {
							return <Fragment key={index}>{link}</Fragment>;
						})}
					</div>
				</div>
			</li>
		</>
	);
};

export default ProjectCard;
