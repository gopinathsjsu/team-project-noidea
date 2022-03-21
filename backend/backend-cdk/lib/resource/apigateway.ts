import { Stack } from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Function } from "aws-cdk-lib/aws-lambda";

export function createRestAPI(stack: Stack, id: string) {
    return new apigw.RestApi(stack, id, {
        defaultCorsPreflightOptions: {
            /**
             * The allow rules are a bit relaxed.
             * I would strongly advise you to narrow them down in your applications.
             */
            allowOrigins: apigw.Cors.ALL_ORIGINS,
            allowMethods: apigw.Cors.ALL_METHODS,
            allowHeaders: ["*"],
            allowCredentials: true
        }
    });
}