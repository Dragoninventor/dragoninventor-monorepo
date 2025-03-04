"use client";

import useSWR, { preload } from "swr";
import pageHitsFetcher from "@/lib/pageHitsFetcher";
import { useEffect } from "react";

preload(
	`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_ENDPOINT}/stats/pageHits`,
	pageHitsFetcher
);

const PageHitsCounter = () => {
	const { data, mutate } = useSWR(
		`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_ENDPOINT}/stats/pageHits`,
		pageHitsFetcher
	);
	const views = data?.views;

	useEffect(() => {
		fetch(
			`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_ENDPOINT}/stats/pageHits`,
			{
				method: "POST"
			}
		)
			.then((res) => res.json())
			.then((data) => {
				process.env.NODE_ENV === "development" && console.log(data);

				return mutate(
					{ views: data.views },
					{
						populateCache: data.views
					}
				);
			});
	}, []);

	return (
		<p>
			Page hits counter: <span className={""}>{views}</span>
		</p>
	);
};

export default PageHitsCounter;
