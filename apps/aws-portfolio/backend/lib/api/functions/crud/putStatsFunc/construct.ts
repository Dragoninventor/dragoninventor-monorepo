import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "node:path";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

type putStatsFuncProps = {
	functionName: string;
	statsTableArn: string;
	environmentVars: {
		statsTableName: string;
	};
};

export const createPutStatsFunc = (
	scope: Construct,
	props: putStatsFuncProps,
) => {
	const putStatsFunc = new NodejsFunction(scope, `${props.functionName}`, {
		functionName: `${props.functionName}`,
		runtime: Runtime.NODEJS_20_X,
		handler: "handler",
		entry: path.join(__dirname, "./main.ts"),
		environment: {
			STATS_TABLE_NAME: props.environmentVars.statsTableName,
		},
	});

	putStatsFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ["dynamodb:PutItem", "dynamodb:UpdateItem"],
			resources: [props.statsTableArn],
		}),
	);

	return putStatsFunc;
};
