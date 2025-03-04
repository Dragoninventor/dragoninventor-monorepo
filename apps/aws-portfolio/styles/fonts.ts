import { Inter, Open_Sans, Titillium_Web } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

// Title
const title_font = Titillium_Web({
	subsets: ["latin"],
	weight: ["400", "600"],
});

// Card Default Fonts
export const default_card_font = Open_Sans({
	subsets: ["latin"],
	variable: "--font-card-default",
	fallback: ["sans-serif"],
});
// export const default_cardpage_font = Montserrat({
// 	subsets: ["latin"],
// 	weight: ["300", "500"],
// 	variable: "--font-cardpage-default",
// 	fallback: ["sans-serif"],
// });
export const default_cardpage_font = Titillium_Web({
	subsets: ["latin"],
	weight: ["400", "600"],
	variable: "--font-cardpage-default",
	fallback: ["sans-serif"],
});
