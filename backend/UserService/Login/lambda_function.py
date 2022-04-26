import json
import logging
import boto3
import os
from User import User
from CreditCard import CreditCard
from botocore.exceptions import ClientError

# from dotenv import load_dotenv
# load_dotenv()

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def lambda_handler(event, context):
    logger.debug('[EVENT] event: {}'.format(event))
    # Required since we want a unified input event
    eventBody = event
    if type(eventBody) == str:
        eventBody = json.loads(eventBody)

    if 'queryStringParameters' in eventBody:
        eventBody = eventBody['queryStringParameters']
    else:
        return returnResponse(400, {'message': 'Invalid input, no body'})
    
    if 'userId' not in eventBody: 
        return returnResponse(400, {'message': 'Invalid input, no user'})

    card = getCreditCard(eventBody['userId'])

    # Remove keys and regions when done
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['AWS_REGION'])
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
        u = User(item['Item']['userId'], [item['Item']['firstName'], item['Item']['lastName']], item['Item']['email'], item['Item']['Address'], item['Item']['Country'], list(item['Item']['UserRoles']))
    except ClientError as e:
        return returnResponse(400, e.response['Error']['Message'])
    if card == None:
        return returnResponse(200, {'user': u.toJson()})
    return returnResponse(200, {'user': u.toJson(), 'card': card.toDict()})

def getCreditCard(userId):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_CREDIT_CARD'])
    try:
        response = table.get_item(
            Key={
                'ownerId': userId
            }
        )
        if 'Item' not in response:
            return None
        return CreditCard(response['Item']['ownerId'], response['Item']['CardNumber'], response['Item']['CVV'], response['Item']['ExpirationDate'])
    except ClientError as e:
        return None

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