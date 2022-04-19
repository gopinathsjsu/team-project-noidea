import { Stack } from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Function } from "aws-cdk-lib/aws-lambda";

export function createRestAPI(stack: Stack, id: string) {
    const restApi =  new apigw.RestApi(stack, id, {
        defaultCorsPreflightOptions: {
            allowOrigins: apigw.Cors.ALL_ORIGINS,
            allowMethods: apigw.Cors.ALL_METHODS,
            allowHeaders: ["*"],
            allowCredentials: true
        }
    });
    return restApi
}