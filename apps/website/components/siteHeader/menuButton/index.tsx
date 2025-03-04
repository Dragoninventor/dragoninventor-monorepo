type MenuButtonProps = {
	navOpened: boolean;
	toggleNav: () => void;
};

const MenuButton = ({ navOpened, toggleNav }: MenuButtonProps) => {
	const barStyles =
		"transform rounded-full border-b border-current transition-all duration-300 ease-in-out absolute"; // I'm using borders so that the lines look less blurry/inconsistent at certain screen resolutions
	// Edit: I don't think this actually makes a difference, but I'm keeping it
	const initialBarLen = 1.75;
	const barGap = 0.8;
	const barLenDiff = 0.25;
	const barLengths = [
		`${initialBarLen}rem`,
		`${initialBarLen - barLenDiff}rem`,
		`${initialBarLen - barLenDiff * 2}rem`,
	];
	const closedBarWidth = "1.5rem";

	return (
		<div
			className={`absolute right-0 top-1.5 mr-5 h-14 w-14 after:absolute after:-z-10 after:h-full after:w-full after:rounded-full after:border after:border-slate-200 after:bg-gray-50 after:shadow-sm after:shadow-slate-400/30 lg:hidden`}
		>
			<button
				className={`absolute right-0 top-0 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition-all duration-150 lg:hidden ${navOpened ? "" : ""}`}
				onClick={toggleNav}
				aria-label={"Open main menu"}
			>
				<div
					className={`relative z-20 flex h-8 flex-col justify-center bg-red-100/0 text-gray-600 transition-all`}
					style={{
						width: navOpened ? "1.5rem" : barLengths[0],
					}}
				>
					<span
						className={`${barStyles} origin-center self-end ${
							navOpened ? "-rotate-45" : ""
						}`}
						style={{
							width: navOpened ? closedBarWidth : barLengths[0],
							marginBottom: navOpened ? "0" : `${barGap}rem`,
						}}
					></span>
					<span
						className={`${barStyles} self-end ${navOpened ? "opacity-0" : ""}`}
						style={{
							width: navOpened ? "0" : barLengths[1],
						}}
					></span>
					<span
						className={`${barStyles} origin-center self-end ${
							navOpened ? "rotate-45" : ""
						}`}
						style={{
							width: navOpened ? closedBarWidth : barLengths[2],
							marginTop: navOpened ? "0" : `${barGap}rem`,
						}}
					></span>
				</div>
			</button>
		</div>
	);
};

export default MenuButton;
