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

    if 'loyaltyId' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no loyaltyId'})
    if 'amount' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no amount'})
    loyaltyId = eventBody['loyaltyId']
    amount = float(eventBody['amount'])

    if not validateInputs({'loyaltyId': loyaltyId, 'amount': amount}):
        return returnResponse(400, {'message': 'Invalid input, invalid type'})

    loyalty = getLoyalty(loyaltyId)
    if loyalty == None:
        return returnResponse(404, {'message': 'Loyalty not found'})
    if not loyalty.canRedeem(amount):
        logger.debug("[ERROR] Not enough points for {}\nRequested: {} Has: {}".format(loyaltyId, amount, loyalty.amount))
        return returnResponse(400, {'message': 'Not enough points',
                                   'loyaltyId': loyaltyId,})
    else:
        return returnResponse(200, {'message': '{} has enough points'.format(loyaltyId),
                                    'loyaltyId': loyaltyId,
                                    'points': float(loyalty.amount),
                                    'status': 'OK'})

def getLoyalty(loyaltyId):
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['AWS_REGION'])
    LoyaltyTable = dynamodb.Table(os.environ['TABLE_LOYALTY'])
    try:
        item = LoyaltyTable.get_item(
            TableName=os.environ['TABLE_LOYALTY'],
            Key={
                'loyaltyId': loyaltyId
            }
        )
        if 'Item' not in item:
            return None
        logger.debug('[LOYALTY] item: {}'.format(item))
        logger.debug('[LOYALTY] item type: {}'.format(type(item)))
        return Loyalty(item['Item']['loyaltyId'], item['Item']['ownerId'], float(item['Item']['amount']), item['Item']['sharable'], item['Item']['sharedWith'])
    except ClientError as e:
        return returnResponse(400, e.response['Error']['Message'])
    


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

def validateInputs(arr):
    if type(arr['loyaltyId']) != str:
        return False
    if type(arr['amount']) != float and type(arr['amount']) != int:
        return False
    return True