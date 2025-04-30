import { CardContent } from "@dragoninventor/ui";
import Link from "next/link";

const NotFound = () => {
	return (
		<CardContent>
			<h1 className={"text-center"}>404 — Page Not Found</h1>
			<h2 className={"text-center italic mb-4 text-gray-600"}>Here be dragons.</h2>
			<p>Sorry! The page you are looking for does not exist.</p>
			<p>Would you like to return <Link href={"/"}
											  className={"text-indigo-500 underline transition-colors hover:text-indigo-700"}>home</Link>?
			</p>
		</CardContent>
	);
};

export default NotFound;
