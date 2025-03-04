import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyResultV2 } from "aws-lambda";

const client = new DynamoDBClient();

const params = {
	TableName: process.env.STATS_TABLE_NAME,
};

const scanAndUnmarshall = async () => {
	try {
		const results = await client.send(new ScanCommand(params));
		console.log(results);

		if (results.Items) {
			return results.Items.map((item) => unmarshall(item));
		}

		return results;
	} catch (error) {
		console.error(error);

		throw error;
	}
};

exports.handler = async (): Promise<APIGatewayProxyResultV2> => {
	const results = await scanAndUnmarshall();

	return {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		},
		body: JSON.stringify(results),
	};
};
