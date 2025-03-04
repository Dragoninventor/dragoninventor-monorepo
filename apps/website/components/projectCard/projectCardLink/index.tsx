import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

const ProjectCardLink = ({
	href,
	linkText,
	icon,
	...props
}: {
	href: LinkProps["href"];
	linkText: ReactNode;
	icon: ReactNode;
	props?: LinkProps;
}) => {
	return (
		<Link
			href={href}
			{...props}
			className={`flex items-center gap-1.5 text-sm text-indigo-500 underline transition-colors hover:text-indigo-700`}
		>
			<span className={""}>{linkText}</span>{" "}
			<span className={""}>{icon}</span>
		</Link>
	);
};
export default ProjectCardLink;
