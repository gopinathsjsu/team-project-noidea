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
    eventBody = eventBody['user']
    
    if 'userId' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no userId'})

    user = None
    
    dynamodb = boto3.resource('dynamodb')
    userTable = dynamodb.Table(os.environ['TABLE_USER'])
    try:
        item = userTable.get_item(
            TableName=os.environ['TABLE_USER'],
            Key={
                'userId': eventBody['userId']
            }
        )
        if 'Item' not in item:
            return returnResponse(400, {'message': 'Invalid userId, user does not exist'})
        user = User(item['Item']['userId'], [item['Item']['firstName'], item['Item']['lastName']], item['Item']['email'], item['Item']['Address'], item['Item']['Country'], list(item['Item']['UserRoles']))
    except ClientError as e:
        return returnResponse(400, e.response['Error']['Message'])

    if 'firstName' in eventBody:
        user.firstName = eventBody['firstName']
    if 'lastName' in eventBody:
        user.lastName = eventBody['lastName']
    if 'email' in eventBody:
        user.email = eventBody['email']
    if 'address' in eventBody:
        user.address = eventBody['address']
    if 'country' in eventBody:
        user.country = eventBody['country']
    if 'roles' in eventBody:
        user.role = eventBody['roles']

    uploadUser(user)
    
    return returnResponse(200, user)

def uploadUser(user):
    logger.debug('[UPLOAD] user: {}'.format(json.dumps(user.toJson())))
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_USER'])
    try:
        table.update_item(
            Key={
                'userId': user.id
            },
            UpdateExpression="set firstName = :fName, lastName = :lName, email = :email, Address = :address, Country = :country",
            ExpressionAttributeValues={
                ':fName': user.firstName,
                ':lName': user.lastName,
                ':email': user.email,
                ':address': user.address,
                ':country': user.country
            },
            ReturnValues="UPDATED_NEW"
        )
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