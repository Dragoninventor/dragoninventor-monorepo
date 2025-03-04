import { Construct } from "constructs";
import { AttributeType, Billing, TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";
import {
	AwsCustomResource,
	AwsCustomResourcePolicy,
	PhysicalResourceId,
} from "aws-cdk-lib/custom-resources";
import { marshall } from "@aws-sdk/util-dynamodb";

type StatsTableProps = {
	tableName: string;
};
export const createStatsTable = (scope: Construct, props: StatsTableProps) => {
	const table = new TableV2(scope, props.tableName, {
		tableName: props.tableName,
		billing: Billing.onDemand(),
		removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
		partitionKey: {
			name: "StatType",
			type: AttributeType.STRING,
		},
	});

	// Create default pageHits stat with views: 0
	new AwsCustomResource(scope, "initDBResource", {
		onCreate: {
			service: "DynamoDB",
			action: "putItem",
			parameters: {
				TableName: props.tableName,
				Item: marshall({
					StatType: "pageHits",
					views: 0,
				}),
			},
			physicalResourceId: PhysicalResourceId.of(
				`${props.tableName}_initialization`,
			),
		},
		policy: AwsCustomResourcePolicy.fromSdkCalls({
			resources: AwsCustomResourcePolicy.ANY_RESOURCE,
		}),
	});

	return table;
};
