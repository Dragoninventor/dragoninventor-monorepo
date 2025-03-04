import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import * as path from "node:path";

type getPageHitsFuncProps = {
	functionName: string;
	statsTableArn: string;
	environmentVars: {
		statsTableName: string;
	};
};

export const createGetPageHitsFunc = (
	scope: Construct,
	props: getPageHitsFuncProps,
) => {
	const getPageHitsFunc = new NodejsFunction(scope, `${props.functionName}`, {
		functionName: `${props.functionName}`,
		runtime: Runtime.NODEJS_20_X,
		handler: "handler",
		entry: path.join(__dirname, "./main.ts"),
		environment: {
			STATS_TABLE_NAME: props.environmentVars.statsTableName,
		},
	});

	getPageHitsFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ["dynamodb:GetItem"],
			resources: [props.statsTableArn],
		}),
	);

	return getPageHitsFunc;
};
