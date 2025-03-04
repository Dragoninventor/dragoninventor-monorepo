import type { Metadata } from "next";
import { ReactNode } from "react";
import PreloadResources from "@/components/preloadResources";
import { SiteBackground } from "@dragoninventor/ui";
import Image from "next/image";

import { default_card_font, default_cardpage_font, inter } from "@/fonts";
import siteBackgroundImage from "/public/site-background.jpg";
import "./globals.css";

export const metadata: Metadata = {
	title: "Portfolio - Michael Hudson"
};

export default function RootLayout({
									   children
								   }: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<PreloadResources />
			<html lang="en-us">
			<body
				className={`${inter.className} ${default_card_font.variable} ${default_cardpage_font.variable} relative flex min-h-screen flex-col items-center px-3 py-2.5 sm:px-[max(0.75rem,5vw)] sm:py-4`}
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
			{children}
			</body>
			</html>
		</>
	);
}
