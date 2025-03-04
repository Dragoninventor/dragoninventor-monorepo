import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

const client = new DynamoDBClient();

const deleteStat = async (StatType: string) => {
	const params = {
		TableName: process.env.STATS_TABLE_NAME,
		Key: marshall({
			StatType: StatType,
		}),
	};

	try {
		const results = await client.send(new DeleteItemCommand(params));
		console.log(results);

		return results;
	} catch (error) {
		console.error(error);

		throw error;
	}
};

exports.handler = async (
	event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
	console.log(event);

	const { StatType } = event.body && JSON.parse(event.body);

	if (!StatType) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "StatType is is missing in the request body.",
			}),
		};
	}

	await deleteStat(StatType);

	return {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		},
		body: JSON.stringify({
			message: `Successfully deleted item with StatType: ${StatType}`,
		}),
	};
};
