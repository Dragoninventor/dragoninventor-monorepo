import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

const client = new DynamoDBClient();

exports.handler = async (
	event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
	const itemData = event.body && JSON.parse(event.body);

	if (!itemData) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "is is missing in the request body.",
			}),
		};
	}

	const params = {
		TableName: process.env.STATS_TABLE_NAME,
		Item: marshall(itemData),
	};

	try {
		await client.send(new PutItemCommand(params));

		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: "Item put successfully.",
		};
	} catch (error) {
		console.error(error);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: `Internal Server Error: ${error}`,
			}),
		};
	}
};
