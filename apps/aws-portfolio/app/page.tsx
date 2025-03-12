import { Montserrat } from "next/font/google";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/dragoninventor_logo.svg";

import {
	SiAmazonwebservices,
	SiCss3,
	SiDocker,
	SiExpress,
	SiGit,
	SiHtml5,
	SiJavascript,
	SiLinux,
	SiMongodb,
	SiMongoose,
	SiNextdotjs,
	SiNodedotjs,
	SiPayloadcms,
	SiReact,
	SiSass,
	SiStripe,
	SiTailwindcss,
	SiTypescript
} from "react-icons/si";
import { CardContent, CardFooter, CardPage } from "@dragoninventor/ui";
import PageHitsCounter from "@/components/pageHitsCounter";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "500"] });

const Section = ({
					 heading,
					 children,
					 className
				 }: {
	heading?: ReactNode;
	children: ReactNode;
	className?: string;
}) => {
	return (
		<section
			className={`flex w-full flex-col text-gray-700${className ? ` ${className}` : ""}`}
		>
			{heading && <SectionHeading>{heading}</SectionHeading>}
			{children}
		</section>
	);
};

const SectionHeading = ({ children }: { children: ReactNode }) => {
	return (
		<h2 className={"mb-2.5 text-xl font-bold text-slate-900"}>
			{children}
		</h2>
	);
};

const Skill = ({
				   icon,
				   children
			   }: {
	icon: ReactNode;
	children: ReactNode;
}) => {
	return (
		<li
			className={
				"flex flex-col items-center gap-x-2 gap-y-1.5 md:gap-x-2.5 lg:gap-x-2.5"
			}
		>
			<span className={"text-3xl text-slate-500 sm:text-4xl"}>
				{icon}
			</span>
			<span className={"text-sm text-slate-700"}>{children}</span>
		</li>
	);
};

export default function Home() {
	return (
		<CardPage>
			<CardContent className={`flex flex-col`}>
				<div className={"mb-9 flex w-full flex-col gap-4"}>
					<div className={"flex w-full justify-center px-2.5"}>
						<Image
							src={Logo}
							alt={"Logo"}
							className={"w-full max-w-[14rem] md:max-w-sm"}
						/>
					</div>
					<h1
						className={`${montserrat.className} flex flex-col gap-1 text-center text-gray-950 sm:gap-1.5`}
					>
						<span className={"text-lg font-light sm:text-xl"}>
							Resume
						</span>
						<span className={"text-3xl sm:text-4xl"}>
							Michael Hudson
						</span>
					</h1>
				</div>
				<div className={"flex w-full flex-col gap-9"}>
					<Section>
						<address
							className={
								"flex flex-col gap-1.5 border-y-2 border-slate-200 py-4 text-center text-slate-700 not-italic md:py-7"
							}
						>
							<span className={""}>
								Website:{" "}
								<Link
									className={"text-blue-700 underline"}
									href={"https://dragoninventor.com"}
								>
									https://dragoninventor.com
								</Link>
							</span>
							<span>
								Projects:{" "}
								<Link
									className={"text-blue-700 underline"}
									href={"https://dragoninventor.com/projects"}
								>
									https://dragoninventor.com/projects
								</Link>
							</span>
							<span>
								<span className={""}>Contact:</span>{" "}
								<Link
									className={"text-blue-700 underline"}
									href={"https://dragoninventor.com/contact"}
								>
									https://dragoninventor.com/contact
								</Link>
							</span>
						</address>
					</Section>
					<Section heading={"Summary of Qualifications"}>
						<p>
							Full-stack web developer with 6+ years of experience building and maintaining websites that
							are accessible, beautiful, and functional. Co-founded and led the technical development of
							Have A Safe Drive, creating a seamless online platform for defensive driving courses with
							certificates accepted for clients across the states.
						</p>
					</Section>
					<Section heading={"Skills"}>
						<ul
							className={
								"mt-2.5 mr-auto ml-4 grid grid-cols-3 gap-x-7 gap-y-5 leading-10 sm:grid-cols-4 md:grid-cols-5 lg:gap-x-10 lg:gap-y-7"
							}
						>
							<Skill icon={<SiNextdotjs />}>Next.js</Skill>
							<Skill icon={<SiReact />}>React</Skill>
							<Skill icon={<SiJavascript />}>Javascript</Skill>
							<Skill icon={<SiTypescript />}>Typescript</Skill>
							<Skill icon={<SiHtml5 />}>HTML</Skill>
							<Skill icon={<SiCss3 />}>CSS</Skill>
							<Skill icon={<SiSass />}>SCSS</Skill>
							<Skill icon={<SiTailwindcss />}>TailwindCSS</Skill>
							<Skill icon={<SiNodedotjs />}>Node.js</Skill>
							<Skill icon={<SiExpress />}>Express</Skill>
							<Skill icon={<SiMongodb />}>MongoDB</Skill>
							<Skill icon={<SiMongoose />}>Mongoose</Skill>
							<Skill icon={<SiPayloadcms />}>PayloadCMS</Skill>
							<Skill icon={<SiStripe />}>Stripe</Skill>
							<Skill icon={<SiLinux />}>Linux</Skill>
							<Skill icon={<SiGit />}>Git</Skill>
							<Skill icon={<SiAmazonwebservices />}>AWS</Skill>
							<Skill icon={<SiDocker />}>Docker</Skill>
						</ul>
					</Section>
					<Section heading={"Work Experience"}>
						<ul className={"flex flex-col gap-1.5"}>
							<li>
								<span className={"font-bold text-slate-600"}>
									Co-founder, Web Developer, and Server Admin
									for Have A Safe Drive
								</span>
								<ul
									className={
										"list-inside list-disc pl-4 sm:pl-7"
									}
								>
									<li>
										Designed and coded the front and back end of the website from scratch.
									</li>
									<li>
										Managed server hosting and site administration using Linux.
									</li>
									<li>
										Implemented full course curriculum functionality, including tests with questions
										and answers.
									</li>
									<li>
										Created a unique certificate generation feature, automating certificates for
										customers upon course completion.
									</li>
									<li>
										Handled on-site payments using Stripe for easy on-site purchasing of courses.
									</li>
								</ul>
							</li>
							<li>
								<span className={"font-bold text-slate-600"}>
									Web Developer for Penn Legal, LLC
								</span>
								<ul
									className={
										"list-inside list-disc pl-4 sm:pl-7"
									}
								>
									<li>
										Built the front end for the website of a
										talented paralegal.
									</li>
								</ul>
							</li>
							<li>
								<span className={"font-bold text-slate-600"}>
									Web Developer for Advice On Fire
								</span>
								<ul
									className={
										"list-inside list-disc pl-4 sm:pl-7"
									}
								>
									<li>
										Built a blog&apos;s front and back end,
										using modern technologies to statically
										generate posts based on dynamic content
										stored in a database.
									</li>
								</ul>
							</li>
						</ul>
					</Section>
					<Section heading={"Education & Certifications"}>
						<ul className={"flex flex-col gap-1.5"}>
							<li>Graduated high school on May 25, 2022.</li>
							<li>
								Completed the Bottega Full-Stack Development
								Course on July 7, 2021.
							</li>
						</ul>
					</Section>
					<Section heading={"About Me"}>
						<p>
							With a passion for web development that started at
							the age of nine, I have honed my craft despite
							facing challenges due to my genetic muscular
							condition. When I felt like I had no options in my
							future, coding stood out to me. It appealed to the
							part of me that likes to solve logical problems,
							such as math, while also having room for the
							creative part of my mind. It was something I could
							do despite my limitations.
						</p>
						<p>
							Over the past nine years, I have dedicated myself to
							learning everything I could about web development
							and coding in general. One of my top priorities in
							web development is accessibility. I strive to
							contribute towards building an internet that is
							inclusive and accessible to everyone.
						</p>
						<p>
							I built the front and back end for
							haveasafedrive.com, a business focused on defensive
							driving courses, in collaboration with my business
							partner at the time. Additionally, I have built
							pennlegallpp.com, a website for a talented
							paralegal. Also in the works: A custom built blog
							with unique features, and a flexible and powerful
							productivity tool for managing pomodoros and your
							daily agenda.
						</p>
					</Section>
				</div>
				<CardFooter>
					<p>
						Made with AWS, following{" "}
						<Link
							href={"https://cloudresumechallenge.dev/"}
							className={
								"text-blue-700 underline visited:text-violet-700"
							}
						>
							The Cloud Resume Challenge
						</Link>
						.
					</p>
					<PageHitsCounter />
				</CardFooter>
			</CardContent>
		</CardPage>
	);
}
