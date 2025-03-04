import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "node:path";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

type addNewPageHitFuncProps = {
	functionName: string;
	statsTableArn: string;
	environmentVars: {
		statsTableName: string;
	};
};

export const createAddNewPageHitFunc = (
	scope: Construct,
	props: addNewPageHitFuncProps,
) => {
	const addNewPageHitFunc = new NodejsFunction(
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

	addNewPageHitFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ["dynamodb:UpdateItem"],
			resources: [props.statsTableArn],
		}),
	);

	return addNewPageHitFunc;
};
