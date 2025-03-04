#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../lib/backend-stack";

const app = new cdk.App();
if (process.env.ENV === "prod") {
	new BackendStack(app, "BackendStack", {
		domainName: process.env.AWS_SITE_DOMAIN as string,
		prod: true,
		repo: "Dragoninventor/dragoninventor-monorepo",
		env: {
			account: process.env.AWS_CDK_ACCOUNT,
			region: "us-east-1"
		}
	});
} else {
	new BackendStack(app, "BackendStackDev", {
		domainName: process.env.AWS_SITE_DOMAIN as string,
		env: {
			account: process.env.AWS_CDK_ACCOUNT,
			region: "us-east-1"
		}
	});
}
