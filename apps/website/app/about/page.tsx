import { Metadata, NextPage } from "next";
import { CardContent } from "@dragoninventor/ui";

import birb from "@/public/birb.jpg";
import StyledImage from "@/components/image";

export const metadata: Metadata = {
	title: "About Me",
};

const About: NextPage = () => {
	return (
		<CardContent>
			<h1 className={"text-center"}>About Me</h1>
			<p>
				With a passion for web development that started at the age of
				nine, I have honed my craft despite facing challenges due to my
				genetic muscular condition. When I felt like I had no options in
				my future, coding stood out to me. It appealed to the part of me
				that likes to solve logical problems, such as math, while also
				having room for the creative part of my mind. It was something I
				could do despite my limitations.
			</p>
			<StyledImage
				src={birb}
				alt={
					"Birds perched in trees with the sun setting on the mountains behind them"
				}
			/>
			<p>
				Over the past nine years, I have dedicated myself to learning
				everything I could about web development and coding in general.
				One of my top priorities in web development is accessibility. I
				strive to contribute towards building an internet that is
				inclusive and accessible to everyone.
			</p>
			<p>
				I built the front and back end for haveasafedrive.com, a
				business focused on defensive driving courses, in collaboration
				with my business partner at the time. Additionally, I have built
				pennlegallpp.com, a website for a talented paralegal. Also in
				the works: A custom built blog with unique features, and a
				flexible and powerful productivity tool for managing pomodoros
				and your daily agenda.
			</p>
		</CardContent>
	);
};

export default About;
