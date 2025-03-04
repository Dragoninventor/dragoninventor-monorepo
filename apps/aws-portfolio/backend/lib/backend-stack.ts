import { Construct } from "constructs";
import { createAPIGateway } from "./api/apigateway";
import { createStatsTable } from "./database/statsTable";
import { createGetStatsFunc } from "./api/functions/crud/getStatsFunc/construct";
import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { createPutStatsFunc } from "./api/functions/crud/putStatsFunc/construct";
import { createDeleteStatFunc } from "./api/functions/crud/deleteStatFunc/construct";
import { createGetStatsItemFunc } from "./api/functions/crud/getStatsItemFunc/construct";
import { createAddNewPageHitFunc } from "./api/functions/pageHits/addNewPageHit/construct";
import { createGetPageHitsFunc } from "./api/functions/pageHits/getPageHits/construct";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3StaticWebsiteOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import * as path from "node:path";
import {
	Effect,
	OpenIdConnectProvider,
	PolicyDocument,
	PolicyStatement,
	Role,
	WebIdentityPrincipal
} from "aws-cdk-lib/aws-iam";

export type EnvProps = {
	domainName: string;
	prod?: boolean;
	repo?: `${string}/${string}`;
} & StackProps;

export class BackendStack extends Stack {
	constructor(
		scope: Construct,
		id: string,
		props: EnvProps
	) {
		super(scope, id, props);

		const statsTable = createStatsTable(this, {
			tableName: "statsTable"
		});

		// Authenticated Functions
		const getStatsFunc = createGetStatsFunc(this, {
			functionName: "getStatsFunc",
			statsTableArn: statsTable.tableArn,
			environmentVars: { statsTableName: statsTable.tableName }
		});
		const putStatsFunc = createPutStatsFunc(this, {
			functionName: "putStatsFunc",
			statsTableArn: statsTable.tableArn,
			environmentVars: {
				statsTableName: statsTable.tableName
			}
		});
		const deleteStatFunc = createDeleteStatFunc(this, {
			functionName: "deleteStatFunc",
			statsTableArn: statsTable.tableArn,
			environmentVars: {
				statsTableName: statsTable.tableName
			}
		});
		const getStatsItemFunc = createGetStatsItemFunc(this, {
			functionName: "getStatsItemFunc",
			statsTableArn: statsTable.tableArn,
			environmentVars: {
				statsTableName: statsTable.tableName
			}
		});

		const getPageHitsFunc = createGetPageHitsFunc(this, {
			functionName: "getPageHitsFunc",
			statsTableArn: statsTable.tableArn,
			environmentVars: {
				statsTableName: statsTable.tableName
			}
		});
		const addPageHitFunc = createAddNewPageHitFunc(this, {
			functionName: "addPageHitFunc",
			statsTableArn: statsTable.tableArn,
			environmentVars: {
				statsTableName: statsTable.tableName
			}
		});

		createAPIGateway(this, {
			apiName: "Stats",
			stageName: props.prod ? "prod" : "dev",
			baseResourceName: "stats",
			leafResourceName: "statType",
			pageHitsResourceName: "pageHits",
			getAllBaseFunc: getStatsFunc,
			getItemLeafFunc: getStatsItemFunc,
			putItemBaseFunc: putStatsFunc,
			deleteItemBaseFunc: deleteStatFunc,
			getPageHitsFunc: getPageHitsFunc,
			addNewPageHitFunc: addPageHitFunc
		});

		const siteBucket = new Bucket(this, "dragoninventor-portfolio-bucket", {
			bucketName: `${props.domainName}${!props.prod ? "-development" : ""}`,
			removalPolicy: RemovalPolicy.DESTROY,
			autoDeleteObjects: !props.prod,
			websiteIndexDocument: "index.html",
			publicReadAccess: props.prod,
			blockPublicAccess: BlockPublicAccess.BLOCK_ACLS
		});

		const distribution = new Distribution(
			this,
			`dragoninventor-portfolio${!props.prod ? "-development" : ""}`,
			{
				defaultBehavior: {
					origin: new S3StaticWebsiteOrigin(siteBucket),
					viewerProtocolPolicy:
					ViewerProtocolPolicy.REDIRECT_TO_HTTPS
				},
				...(props.prod && {
					domainNames: [props.domainName],
					certificate: new Certificate(this, "SiteCertificate", {
						domainName: props.domainName,
						certificateName: "Dragoninventor Portfolio Certificate",
						validation: CertificateValidation.fromDns()
					})
				})
			}
		);

		new CfnOutput(this, "SiteDomain", {
			value: distribution.domainName
		});

		new BucketDeployment(this, "Deploy", {
			sources: [Source.asset(path.resolve(__dirname, "../../out"))],
			destinationBucket: siteBucket,
			distribution: distribution,
			distributionPaths: ["/*"]
		});

		if (!props.repo) {
			console.log(
				"Repository not found, skipping GitHub Actions role setup..."
			);
		} else {
			const oidcProvider = new OpenIdConnectProvider(
				this,
				"GitHubOIDCProvider",
				{
					url: "https://token.actions.githubusercontent.com",
					thumbprints: ["D89E3BD43D5D909B47A18977AA9D5CE36CEE184C"],
					clientIds: ["sts.amazonaws.com"]
				}
			);

			const role = new Role(this, "GitHubActionsDeploymentUser", {
				assumedBy: new WebIdentityPrincipal(
					oidcProvider.openIdConnectProviderArn,
					{
						StringLike: {
							"token.actions.githubusercontent.com:sub": `repo:${props.repo}:*`,
							"token.actions.githubusercontent.com:aud":
								"sts.amazonaws.com"
						}
					}
				),
				roleName: "github-actions-deployment-role",
				inlinePolicies: {
					"github-actions-deployment-policy": new PolicyDocument({
						assignSids: true,
						statements: [
							new PolicyStatement({
								effect: Effect.ALLOW,
								actions: ["sts:AssumeRole"],
								resources: [
									`arn:aws:iam::${Stack.of(this).account}:role/cdk-*`
								]
							})
						]
					})
				}
			});

			new CfnOutput(this, "GitHubActionsRoleOutput", {
				value: role.roleArn
			});
		}
	}
}
