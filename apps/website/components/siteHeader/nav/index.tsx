import Link from "next/link";
import { usePathname } from "next/navigation";
import { Raleway } from "next/font/google";

const montserrat = Raleway({ subsets: ["latin"] });

type NavbarProps = {
	navOpened: boolean;
	setNavOpened: (navOpened: boolean) => void;
	navSmoothTransition: boolean;
};
const Navbar = ({
	navOpened,
	setNavOpened,
	navSmoothTransition,
}: NavbarProps) => {
	const path = usePathname();

	const NavLink = ({
		href,
		children,
	}: {
		href: string;
		children: string;
	}) => {
		return (
			<Link
				href={href}
				className={`px-4 py-2 text-lg tracking-tight text-gray-600 duration-200 lg:cursor-pointer lg:transition-colors ${montserrat.className}`}
				onClick={() => {
					if (path === href) {
						setNavOpened(false);
					}
				}}
			>
				{children}
			</Link>
		);
	};

	return (
		<div
			className={`fixed top-0 left-0 z-10 flex h-svh w-screen lg:relative lg:z-0 lg:h-auto lg:w-auto ${
				navSmoothTransition ? "transition-all duration-400" : ""
			} ${
				navOpened
					? "bg-slate-400/30"
					: "pointer-events-none bg-slate-400/0 lg:pointer-events-auto"
			}`}
			onClick={() => setNavOpened(false)}
		>
			{/* Mobile navbar sidebar background has a brighter background than most Card-like ui, including the parent header background, cause it looks weird when it's darker. */}
			<nav
				className={`absolute top-2.5 bottom-2.5 z-20 flex w-72 max-w-full flex-col items-center gap-7 overflow-y-scroll rounded bg-slate-50 px-5 pt-20 pb-10 text-slate-50 shadow-md shadow-slate-400/30 lg:relative lg:top-0 lg:right-0 lg:w-full lg:gap-4 lg:bg-transparent lg:p-0 lg:break-all lg:shadow-none ${
					navOpened ? "right-4" : "-right-[100svw]"
				} ${navSmoothTransition ? "transition-all duration-300" : ""}`}
				onClick={(event) => {
					event.stopPropagation();
				}}
			>
				<NavLink href={"/"}>Home</NavLink>
				<NavLink href={"/about"}>About</NavLink>
				<NavLink href={"/projects"}>Projects</NavLink>
				{/*<NavLink href={"/blog"}>Blog</NavLink> Coming soon! Maybe. */}
				<NavLink href={"/contact"}>Contact</NavLink>
			</nav>
		</div>
	);
};

export default Navbar;
