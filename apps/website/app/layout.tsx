import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { SiteBackground } from "@dragoninventor/ui";
import Image from "next/image";

import siteBackgroundImage from "/public/site-background.jpg";

import { default_card_font, default_cardpage_font, inter } from "@/fonts";
import CenteredLayout from "../components/centeredSiteLayout";

export const metadata: Metadata = {
	title: {
		template: "Dragoninventor – %s",
		default:
			"Dragoninventor - Full-Stack Web Developer and Inventor of Dragons"
	}
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<html lang="en-us">
			<body
				className={`${inter.className} ${default_card_font.variable} ${default_cardpage_font.variable} relative grid min-h-screen grid-rows-1 flex-col justify-items-center px-4 py-2.5`} // bg-indigo-200
				style={{
					background:
						"linear-gradient(160deg, rgba(87,106,168,1) 0%, rgba(115,132,196,1) 10%, rgba(152,164,219,1) 40%, rgba(197,189,247,1) 75%, rgba(204,163,231,1) 100%)",
					backgroundAttachment: "fixed",
					backgroundPosition: "center"
				}}
			>
			<SiteBackground
				imageComponent={({ className, fill, quality }) => (
					<Image
						src={siteBackgroundImage}
						alt={"Utah rocks on a clear sunny day."}
						className={className}
						fill={fill}
						quality={quality}
					/>
				)}
			/>
			<CenteredLayout>{children}</CenteredLayout>
			</body>
			</html>
		</>
	);
}
