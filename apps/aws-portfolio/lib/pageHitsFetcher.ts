import { Fetcher } from "swr";

const pageHitsFetcher: Fetcher<
	{
		views: string;
	},
	string
> = async (url) => {
	// const { url, tags } = args;

	const res = await fetch(url, {
		// next: {
		// 	tags: [...tags]
		// }
	});

	if (!res.ok) {
		throw new Error(res.statusText);
	}

	return await res.json();
};

export default pageHitsFetcher;
