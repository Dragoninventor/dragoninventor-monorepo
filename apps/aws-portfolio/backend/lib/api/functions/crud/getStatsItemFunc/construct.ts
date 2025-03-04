import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "node:path";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

type getStatsItemFuncProps = {
	functionName: string;
	statsTableArn: string;
	environmentVars: {
		statsTableName: string;
	};
};

export const createGetStatsItemFunc = (
	scope: Construct,
	props: getStatsItemFuncProps,
) => {
	const getStatsItemFunc = new NodejsFunction(
		scope,
		`${props.functionName}`,
		{
			functionName: `${props.functionName}`,
			runtime: Runtime.NODEJS_20_X,
			handler: "handler",
			entry: path.join(__dirname, "./main.ts"),
			environment: {
				STATS_TABLE_NAME: props.environmentVars.statsTableName,
			},
		},
	);

	getStatsItemFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ["dynamodb:GetItem"],
			resources: [props.statsTableArn],
		}),
	);

	return getStatsItemFunc;
};
