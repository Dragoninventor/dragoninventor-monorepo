"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MenuButton from "./menuButton";
import Nav from "@/components/siteHeader/nav";

const SiteHeader = () => {
	const [navOpened, setNavOpened] = useState(false);
	const [navSmoothTransition, setNavSmoothTransition] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		setNavSmoothTransition(false);
		setNavOpened(false);
	}, [pathname]);

	useEffect(() => {
		if (navOpened) {
			document.body.classList.add("overflow-y-hidden");
		} else {
			document.body.classList.remove("overflow-y-hidden");
		}
	}, [navOpened]);

	const toggleNav = () => {
		setNavSmoothTransition(true);
		setNavOpened(!navOpened);
	};

	return (
		// Background of header is using a :before pseudo-element so that it can use backdrop-filter without breaking the child navbar's "position: fixed" property. If the parent element of a position fixed child uses any transform or filter it makes children with "position: fixed" behave like "position: absolute:". Go figure.
		<header
			className={`fixed right-0 top-8 -mt-2.5 h-fit rounded-l-full lg:sticky lg:top-14 lg:w-40 lg:break-words`}
		>
			<Nav
				navOpened={navOpened}
				setNavOpened={setNavOpened}
				navSmoothTransition={navSmoothTransition}
			/>
			<MenuButton navOpened={navOpened} toggleNav={toggleNav} />
		</header>
	);
};

export default SiteHeader;
