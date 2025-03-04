import { Metadata, NextPage } from "next";
import Logo from "@/public/dragoninventor_logo.svg";
import Image from "next/image";
import { Montserrat, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { CardContent } from "@dragoninventor/ui";

const saira = Playfair_Display({ subsets: ["latin"] });
const openSans = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	description:
		"I am Michael Hudson, creator of dragons: creative websites with heart and passion poured into them. I specialize in building fast, responsive, and accessible websites using modern technologies."
};

const Home: NextPage = () => {
	return (
		<CardContent>
			<main className="flex flex-col">
				{/* LOGO */}
				<div className={"mb-2 flex w-full justify-center px-4"}>
					<Image
						src={Logo}
						alt={"Logo"}
						className={"w-full max-w-[16rem] md:max-w-sm"}
					/>
				</div>
				{/* TEXT */}
				<div
					className={
						"mb-7 flex w-full flex-col md:px-0 md:py-0 lg:gap-5"
					}
				>
					<h1 className={`${saira.className} flex flex-col`}>
						<span
							className={
								"text-xl font-medium text-gray-900 lg:text-2xl"
							}
						>
							I am
						</span>{" "}
						<span
							className={
								"text-4xl font-bold text-gray-900 lg:text-6xl"
							}
						>
							Dragoninventor
						</span>
					</h1>
					<h2
						className={`${openSans.className} font-light text-gray-700 lg:text-lg`}
					>
						I create dragons: creative websites with heart and
						passion poured into them. I specialize in building fast,
						responsive, and accessible websites using modern
						technologies.
					</h2>
				</div>
				<div className={"flex w-full flex-col items-center gap-2.5"}>
					<Link
						href={"/projects"}
						className={
							"relative flex items-center gap-1.5 rounded border border-violet-200 bg-gray-50 px-5 py-2.5 text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-b after:bg-violet-200"
						}
					>
						<span>See my work </span>
						<BsArrowRight
							size={"1em"}
							className={`ml-1 inline-block`}
						/>
					</Link>
				</div>
			</main>
		</CardContent>
	);
};

export default Home;
