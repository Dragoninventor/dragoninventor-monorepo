import { Metadata, NextPage } from "next";
import haveASafeDriveImage from "/public/haveasafedrive.png";
import pennLegalImage from "/public/pennlegal.png";
import adviceOnFireImage from "/public/adviceonfire.png";
import dragoninventorImage from "/public/dragoninventor-site.png";
import amityAgendaImage from "/public/amity-agenda.png";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import ProjectCard from "@/components/projectCard";
import ProjectCardLink from "@/components/projectCard/projectCardLink";
import { CardContent } from "@dragoninventor/ui";

export const metadata: Metadata = {
	title: "My Projects"
};

const Projects: NextPage = () => {
	return (
		<CardContent>
			<h1 className={`mb-7 text-center`}>My Projects</h1>
			<ul className={"grid gap-4"}>
				<ProjectCard
					name={"Have A Safe Drive"}
					description={
						"A website for online defensive driving courses."
					}
					image={{
						src: haveASafeDriveImage,
						alt: "Have A Safe Drive website"
					}}
					// Temporarily taking down until I publish the repo
					// links={[
					// 	<ProjectCardLink
					// 		href={
					// 			"https://github.com/Dragoninventor/have-a-safe-drive"
					// 		}
					// 		key={"github"}
					// 		linkText={"Github"}
					// 		icon={<FaGithub />}
					// 	/>
					// ]}
				/>
				<ProjectCard
					name={"Penn Legal LPP"}
					description={"The portfolio of a talented paralegal."}
					image={{
						src: pennLegalImage,
						alt: "Penn Legal LPP website"
					}}
					links={[
						<ProjectCardLink
							href={"https://pennlegallpp.com/"}
							key={"website"}
							linkText={"Website"}
							icon={<FaExternalLinkAlt />}
						/>
					]}
				/>
				<ProjectCard
					name={"Dragoninventor Monorepo"}
					description={
						"Hey, that's me! A monorepo containing both this site and my AWS portfolio site."
					}
					image={{
						src: dragoninventorImage,
						alt: "Dragoninventor website"
					}}
					links={[
						<ProjectCardLink
							href={
								"https://github.com/Dragoninventor/dragoninventor-monorepo"
							}
							key={"github"}
							linkText={"Github"}
							icon={<FaGithub />}
						/>
					]}
				/>
				<ProjectCard
					name={"Advice On Fire"}
					description={"The blog for a wise writer and friend."}
					image={{
						src: adviceOnFireImage,
						alt: "Advice On Fire website"
					}}
					links={[
						<ProjectCardLink
							href={"https://adviceonfire.com/"}
							key={"website"}
							linkText={"Website"}
							icon={<FaExternalLinkAlt />}
						/>
					]}
				/>
				<ProjectCard
					name={"Amity Agenda"}
					description={
						"A project in development for a day-planner and todo application that specializes in enabling productive days and helping executive function."
					}
					image={{
						src: amityAgendaImage,
						alt: "Have A Safe Drive website"
					}}
				/>
			</ul>
		</CardContent>
	);
};

export default Projects;
