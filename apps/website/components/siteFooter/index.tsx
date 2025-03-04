import Link from "next/link";
import { DateTime } from "luxon";
import { ReactNode } from "react";
import {
	AiFillGithub,
	AiFillHeart,
	AiFillHome,
	AiFillInfoCircle,
	AiFillMail,
} from "react-icons/ai";
import { CardFooter } from "@dragoninventor/ui";

const SiteFooter = () => {
	const FooterLink = ({
		href,
		children,
		icon,
	}: {
		href: string;
		children: ReactNode;
		icon: ReactNode;
	}) => {
		return (
			<Link
				href={href}
				className={"flex items-center gap-2 text-gray-700 underline"}
			>
				{icon}
				{children}
			</Link>
		);
	};

	return (
		<CardFooter>
			{/*<footer*/}
			{/*	className={`${cairo.className} mb-2 mt-2.5 flex w-auto flex-col items-center border-t border-gray-400 py-12 !text-gray-800`}*/}
			{/*>*/}
			<div className={"flex w-full flex-col gap-10"}>
				<div className="grid w-full auto-cols-min grid-cols-1 gap-x-2.5 gap-y-2.5 sm:grid-cols-2 sm:gap-y-4 md:grid-cols-3">
					<FooterLink href="/" icon={<AiFillHome size={"1.25em"} />}>
						Home
					</FooterLink>
					<FooterLink
						href="/about"
						icon={<AiFillInfoCircle size={"1.25em"} />}
					>
						About Me
					</FooterLink>
					<FooterLink
						href="/projects"
						icon={<AiFillHeart size={"1.25em"} />}
					>
						Projects
					</FooterLink>
					<FooterLink
						href={"https://github.com/Dragoninventor"}
						icon={<AiFillGithub size={"1.25em"} />}
					>
						Github
					</FooterLink>
					<FooterLink
						href="/contact"
						icon={<AiFillMail size={"1.25em"} />}
					>
						Contact
					</FooterLink>
				</div>
				<p className={""}>
					Copyright 2023-{DateTime.now().year}, Dragoninventor. All
					rights reserved.
				</p>
			</div>
		</CardFooter>
	);
};

export default SiteFooter;
