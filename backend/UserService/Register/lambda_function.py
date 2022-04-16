import json
import logging
import boto3
import os
from User import User
from botocore.exceptions import ClientError

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def lambda_handler(event, context):
    logger.debug('[EVENT] event: {}'.format(event))
    logger.debug('[EVENT] eventType: {}'.format(type(event)))
    # Required since we want a unified input event
    eventBody = event
    if type(eventBody) == str:
        eventBody = json.loads(eventBody)

    if 'body' in eventBody:
        eventBody = eventBody['body']
    else:
        return returnResponse(400, {'message': 'Invalid input, no body'})
    
    if type(eventBody) == str:
        eventBody = json.loads(eventBody)
        logger.debug('[EVENT] eventBody: {}'.format(eventBody))
    
    if 'user' not in eventBody: 
        return returnResponse(400, {'message': 'Invalid input, no user'})

    user = User(eventBody['user']['userId'], eventBody['user']['name'], eventBody['user']['email'], eventBody['user']['address'], eventBody['user']['country'], eventBody['user']['roles'])
    try:
        uploadUser(user)
    except ClientError as e:
        logger.error(e.response['Error']['Message'])
        return returnResponse(500, {'message': 'Error uploading user'})
    
    return returnResponse(200, {'message': 'User created',
                                'user': user.toJson()})

def uploadUser(user):
    logger.debug('[UPLOAD] user: {}'.format(json.dumps(user.toJson())))
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
    try:
        table.put_item(Item=user.toDict())
        for role in user.role:
            table.update_item(
                Key={
                    "userId": user.id
                },
                UpdateExpression="ADD UserRoles :role",
                ExpressionAttributeValues={
                    ':role': {role}
                }
            )
    except ClientError as e:
        logger.error(e.response['Error']['Message'])
        return returnResponse(500, {'message': 'Error uploading user2'})


def returnResponse(statusCode, body):
    logger.debug('[RESPONSE] statusCode: {} body: {}'.format(statusCode, body))
    logger.debug('[RESPONSE] json.dumps(body): {}'.format(json.dumps(body)))
    return {
        'statusCode': statusCode,
        'body': json.dumps(body),
        'isBase64Encoded': False,
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            'Access-Control-Allow-Credentials': True,
            'Content-Type': 'application/json'
        }
    }