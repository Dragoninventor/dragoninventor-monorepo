import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

const client = new DynamoDBClient();

const getPageHits = async () => {
	const params = {
		TableName: process.env.STATS_TABLE_NAME,
		Key: marshall({
			StatType: "pageHits"
		})
	};

	try {
		const results = await client.send(new GetItemCommand(params));

		if (results.Item) {
			return unmarshall(results.Item);
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);

		throw error;
	}
};

exports.handler = async (
	event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
	console.log(event);

	const pageHits = await getPageHits();

	if (!pageHits) {
		return {
			statusCode: 404,
			body: JSON.stringify({
				message: `Page hits not found.`
			})
		};
	}

	return {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		},
		body: JSON.stringify({
			views: pageHits.views,
			message: `Successfully retrieved page hits.`
		})
	};
};
