import Image, { ImageProps } from "next/image";

type StyledImageProps = {
	src: ImageProps["src"];
	alt: ImageProps["alt"];
	className?: ImageProps["className"];
	wrapperClassName?: string;
	props?: ImageProps;
};
const StyledImage = ({
	src,
	alt,
	className,
	wrapperClassName,
	...props
}: StyledImageProps) => {
	return (
		<div
			className={`styledImage relative${
				wrapperClassName ? ` ${wrapperClassName}` : ""
			}`}
		>
			<Image
				src={src}
				alt={alt}
				className={`object-cover rounded${className ? ` ${className}` : ""}`}
				{...props}
			/>
			<div className="absolute left-0 top-0 h-full w-full rounded shadow-inner shadow-slate-600/30" />
		</div>
	);
};

export default StyledImage;
