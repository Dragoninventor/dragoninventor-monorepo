import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "node:path";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

type getStatsFuncProps = {
	functionName: string;
	statsTableArn: string;
	environmentVars: { statsTableName: string };
};
export const createGetStatsFunc = (
	scope: Construct,
	props: getStatsFuncProps,
) => {
	const getStatsFunc = new NodejsFunction(scope, `${props.functionName}`, {
		functionName: `${props.functionName}`,
		runtime: Runtime.NODEJS_20_X,
		handler: "handler",
		entry: path.join(__dirname, "./main.ts"),
		environment: {
			STATS_TABLE_NAME: props.environmentVars.statsTableName,
		},
	});

	getStatsFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ["dynamodb:Scan"],
			resources: [props.statsTableArn],
			// conditions: {
			// 	IpAddress: {
			// 		"aws:SourceIp": "64.23.147.171",
			// 	},
			// },
		}),
	);

	return getStatsFunc;
};
