import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "node:path";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

type deleteStatFuncProps = {
	functionName: string;
	statsTableArn: string;
	environmentVars: {
		statsTableName: string;
	};
};

export const createDeleteStatFunc = (
	scope: Construct,
	props: deleteStatFuncProps,
) => {
	const deleteStatFunc = new NodejsFunction(scope, `${props.functionName}`, {
		functionName: `${props.functionName}`,
		runtime: Runtime.NODEJS_20_X,
		handler: "handler",
		entry: path.join(__dirname, "./main.ts"),
		environment: {
			STATS_TABLE_NAME: props.environmentVars.statsTableName,
		},
	});

	deleteStatFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ["dynamodb:DeleteItem"],
			resources: [props.statsTableArn],
		}),
	);

	return deleteStatFunc;
};
