import { DynamoDBClient, ReturnValue, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

const client = new DynamoDBClient();

const addNewPageHit = async () => {
	const params = {
		TableName: process.env.STATS_TABLE_NAME,
		Key: marshall({
			StatType: "pageHits"
		}),
		ReturnValues: "ALL_NEW" as ReturnValue,
		UpdateExpression: "SET #pageHits = #pageHits + :hitsIncrement",
		ExpressionAttributeValues: marshall({
			":hitsIncrement": 1
		}),
		ExpressionAttributeNames: {
			"#pageHits": "views"
		}
	};

	try {
		const results = await client.send(new UpdateItemCommand(params));
		console.log(results);

		if (results.Attributes) {
			return unmarshall(results.Attributes);
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

	const newPageHits = await addNewPageHit();

	if (!newPageHits) {
		return {
			statusCode: 404,
			body: JSON.stringify({
				message: `New page hits not found.`
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
			views: newPageHits.views,
			message: `Successfully added new page hit.`
		})
	};
};
