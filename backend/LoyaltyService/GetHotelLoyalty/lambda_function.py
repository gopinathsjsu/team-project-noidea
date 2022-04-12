from decimal import *
import json
import logging
import boto3
import os
from Loyalty import Loyalty
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
        return returnResponse(400, {'message': 'Invalid input, no queryStringParameters'})
    
    if 'userId' not in eventBody: 
        return returnResponse(400, {'message': 'Invalid input, no userId'})

    # Remove keys and regions when done
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['AWS_REGION'])
    LoyaltyTable = dynamodb.Table(os.environ['TABLE_LOYALTY'])
    try:
        item = LoyaltyTable.get_item(
            TableName=os.environ['TABLE_LOYALTY'],
            Key={
                'loyaltyId': eventBody['userId']
            }
        )
        if 'Item' not in item:
            return returnResponse(400, {'message': 'Invalid loyaltyId, Loyalty does not exist'})
        logger.debug('[LOYALTY] item: {}'.format(item))
        logger.debug('[LOYALTY] item type: {}'.format(type(item)))
        l = Loyalty(item['Item']['loyaltyId'], item['Item']['ownerId'], item['Item']['amount'], item['Item']['sharable'], item['Item']['sharedWith'])
    except ClientError as e:
        return returnResponse(400, e.response['Error']['Message'])
    return returnResponse(200, {'loyalty': l.toDict()})

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