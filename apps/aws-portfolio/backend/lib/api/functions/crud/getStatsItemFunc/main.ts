import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

const client = new DynamoDBClient();

const getItem = async (StatType: string) => {
	const params = {
		TableName: process.env.STATS_TABLE_NAME,
		Key: marshall({
			StatType: StatType,
		}),
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
	event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
	// /stats/{statType=...}
	const StatType = event.pathParameters?.statType;

	if (!StatType) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "StatType is missing in the request body.",
			}),
		};
	}

	const item = await getItem(StatType);

	if (!item) {
		return {
			statusCode: 404,
			body: JSON.stringify({
				message: `Stat with StateType ${StatType} not found.`,
			}),
		};
	}

	return {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		},
		body: JSON.stringify(item),
	};
};
