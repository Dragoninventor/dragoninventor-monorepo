import { Construct } from "constructs";
import { ApiKey, ApiKeySourceType, Cors, LambdaIntegration, RestApi, UsagePlan } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { CfnOutput } from "aws-cdk-lib";

type APIGatewayProps = {
	apiName: string;
	stageName: string;
	baseResourceName: string;
	leafResourceName: string;
	pageHitsResourceName: string;
	getAllBaseFunc: IFunction;
	putItemBaseFunc: IFunction;
	deleteItemBaseFunc: IFunction;
	getItemLeafFunc: IFunction;
	getPageHitsFunc: IFunction;
	addNewPageHitFunc: IFunction;
};
export const createAPIGateway = (scope: Construct, props: APIGatewayProps) => {
	const api = new RestApi(scope, props.apiName, {
		restApiName: props.apiName,
		apiKeySourceType: ApiKeySourceType.HEADER,
		deployOptions: {
			stageName: props.stageName
		}
	});

	const apiKey = new ApiKey(scope, "ApiKey");
	const usagePlan = new UsagePlan(scope, "UsagePlan", {
		name: "Usage Plan",
		apiStages: [
			{
				api,
				stage: api.deploymentStage
			}
		]
	});
	usagePlan.addApiKey(apiKey);

	new CfnOutput(scope, "API Key ID", {
		value: apiKey.keyId
	});

	// /stats
	const baseResource = api.root.addResource(props.baseResourceName);
	// /stats/{leaf}
	const leafResource = baseResource.addResource(
		`{${props.leafResourceName}}`
	);
	// /stats/pageHits
	const pageHitsResource = baseResource.addResource(
		props.pageHitsResourceName
	);

	baseResource.addCorsPreflight({
		allowOrigins: ["https://portfolio.dragoninventor.com"], // TODO: Add env for website, i.e. https://portfolio.dragoninventor.com
		allowMethods: Cors.ALL_METHODS
	});
	leafResource.addCorsPreflight({
		allowOrigins: ["https://portfolio.dragoninventor.com"],
		allowMethods: Cors.ALL_METHODS
	});
	pageHitsResource.addCorsPreflight({
		allowOrigins: ["https://portfolio.dragoninventor.com"],
		allowMethods: Cors.ALL_METHODS
	});

	// Authenticated Integrations
	const getAllBaseIntegration = new LambdaIntegration(props.getAllBaseFunc);
	const putItemBaseIntegration = new LambdaIntegration(props.putItemBaseFunc);
	const deleteItemBaseIntegration = new LambdaIntegration(
		props.deleteItemBaseFunc
	);
	const getItemLeafIntegration = new LambdaIntegration(props.getItemLeafFunc);

	baseResource.addMethod("GET", getAllBaseIntegration, {
		apiKeyRequired: true
	});
	baseResource.addMethod("POST", putItemBaseIntegration, {
		apiKeyRequired: true
	});
	baseResource.addMethod("PUT", putItemBaseIntegration, {
		apiKeyRequired: true
	});
	baseResource.addMethod("DELETE", deleteItemBaseIntegration, {
		apiKeyRequired: true
	});
	leafResource.addMethod("GET", getItemLeafIntegration, {
		apiKeyRequired: true
	});

	// Public Integrations
	const getPageHitsIntegration = new LambdaIntegration(props.getPageHitsFunc);
	const addNewPageHitPageHitsIntegration = new LambdaIntegration(
		props.addNewPageHitFunc
	);

	pageHitsResource.addMethod("GET", getPageHitsIntegration);
	pageHitsResource.addMethod("POST", addNewPageHitPageHitsIntegration);

	return api;
};
