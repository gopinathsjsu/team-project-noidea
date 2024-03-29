import json
import logging
import boto3
import os
from User import User
from CreditCard import CreditCard
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
    
    user = None
    card = None
    if 'user' in eventBody: 
        user = User(eventBody['user']['userId'], eventBody['user']['name'], eventBody['user']['email'], eventBody['user']['address'], eventBody['user']['country'], eventBody['user']['roles'])
    if 'card' in eventBody:
        card = CreditCard(eventBody['card']['userId'], eventBody['card']['number'], eventBody['card']['cvv'], eventBody['card']['expDate'])
    
    try:
        if user is not None and card is None:
            uploadUser(user)
            return returnResponse(200, {'message': 'User updated',
                                        'user': user.toJson()})
        if card is not None and user is None:
            uploadCard(card)
            return returnResponse(200, {'message': 'Card updated',
                                        'card': card.toDict()})
        if user is not None and card is not None:
            uploadUser(user)
            uploadCard(card)
            return returnResponse(200, {'message': 'User and card updated',
                                        'user': user.toJson(),
                                        'card': card.toDict()})
        return returnResponse(400, {'message': 'Invalid input, no user or card'})
    except ClientError as e:
        logger.error(e.response['Error']['Message'])
        return returnResponse(500, {'message': 'Error uploading user'})

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
        raise e

def getUser(user):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
    try:
        response = table.get_item(
            Key={
                'userId': user.id
            }
        )
    except ClientError as e:
        logger.error(e.response['Error']['Message'])
        raise e
    if 'Item' in response:
        return response['Item']
    return None

def uploadCard(card):
    logger.debug('[UPLOAD] card: {}'.format(json.dumps(card.toDict())))
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_CARD'])
    try:
        table.put_item(Item=card.toDict())
    except ClientError as e:
        logger.error(e.response['Error']['Message'])
        raise e

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