import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Duration, Stack } from 'aws-cdk-lib';
import { Function } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export function createBookingLambda(stack: Stack, functionName: string, handerPath: string, environVars: {}): Function {
    let lambdaFunction = new Function(stack, functionName,{
        runtime: lambda.Runtime.PYTHON_3_9,
        functionName: functionName,
        handler: handerPath,
        code: lambda.Code.fromAsset(path.join(__dirname, '../lambdafunctions')),
        memorySize: 512,
        timeout: Duration.minutes(12),
        environment: environVars
        });
    return lambdaFunction
}

export function createRoomLambda(stack: Stack, functionName: string, handerPath: string, environVars: {}): Function {
    let lambdaFunction = new Function(stack, functionName,{
        runtime: lambda.Runtime.PYTHON_3_9,
        functionName: functionName,
        handler: handerPath,
        code: lambda.Code.fromAsset(path.join(__dirname, '../lambdafunctions')),
        memorySize: 512,
        timeout: Duration.minutes(12),
        environment: environVars
        });
    return lambdaFunction
}

export function createAssociateLambda(stack: Stack, functionName: string, handerPath: string, environVars: {}): Function {
    let lambdaFunction = new Function(stack, functionName,{
        runtime: lambda.Runtime.PYTHON_3_9,
        functionName: functionName,
        handler: handerPath,
        code: lambda.Code.fromAsset(path.join(__dirname, '../lambdafunctions/associate')),
        memorySize: 512,
        timeout: Duration.minutes(12),
        environment: environVars
        });
    return lambdaFunction
}