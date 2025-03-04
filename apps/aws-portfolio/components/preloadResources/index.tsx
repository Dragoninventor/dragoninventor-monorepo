import ReactDOM from "react-dom";

const PreloadResources = () => {
	ReactDOM.preload(
		`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_ENDPOINT}/stats/pageHits`,
		{
			as: "fetch",
			crossOrigin: "anonymous"
		}
	);

	return null;
};

export default PreloadResources;
