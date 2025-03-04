import { CssParticles } from "./cssParticles";
import React, { ComponentType } from "react";

type SiteBackgroundProps = {
	imageComponent?: ComponentType<{
		className: string;
		fill: boolean;
		quality: number;
	}>;
};
export const SiteBackground = (props: SiteBackgroundProps) => {
	const ImageComponent = props.imageComponent;

	return (
		<div className={"fixed left-0 top-0 -z-10 h-screen w-full"}>
			<div
				className={`4xl:after:opacity-100 fixed left-0 top-0 -z-10 mx-auto h-screen w-screen bg-cover after:absolute after:left-0 after:top-0 after:h-screen after:w-screen after:bg-gradient-to-b after:from-indigo-400/100 after:from-40% after:via-indigo-300/75 after:to-indigo-200/50 after:opacity-0 motion-safe:after:transition-opacity`}
				style={{
					backgroundSize: "cover",
					backgroundAttachment: "fixed",
				}}
			>
				{ImageComponent && (
					<ImageComponent
						className={
							"select-none object-cover object-top xl:object-center"
						}
						fill={true}
						quality={100}
					/>
				)}
			</div>
			<CssParticles />
		</div>
	);
};
