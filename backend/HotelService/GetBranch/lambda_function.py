import json
import logging
import boto3
import os
from Hotel import Hotel
from Branch import Branch
from boto3.dynamodb.conditions import Attr
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
    
    if 'hotelId' not in eventBody: 
        return returnResponse(400, {'message': 'Invalid input, no hotel'})
    
    hotel = getHotel(eventBody['hotelId'])
    if hotel is None:
        return returnResponse(400, {'message': 'Invalid hotelId'})

    if 'branchId' not in eventBody: 
        return returnResponse(400, {'message': 'Invalid input, no branch'})
    
    if eventBody['branchId'] == '-1':
        branches = getBranchAll(eventBody['hotelId'])
        if branches == None:
            return returnResponse(400, {'message': 'No branches found',
                                       'status': 'error'})
        return returnResponse(200, {'message': '{} branches found'.format(len(branches)),
                                    'status': 'success',
                                    'branches': branches})
        
    branch = getBranch(eventBody['branchId'], eventBody['hotelId'])
    if (branch == None):
        return returnResponse(400, {'message': 'Invalid input, branch does not exist',
                                    'status': 'error'})

    return returnResponse(200, {'message': 'branch found',
                                'status': 'success',
                                'branch': branch.toJson()})
    
def getHotel(hotelId):
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['AWS_REGION'])
    hotelTable = dynamodb.Table(os.environ['TABLE_HOTEL'])
    try:
        item = hotelTable.get_item(
            TableName=os.environ['TABLE_HOTEL'],
            Key={
                'hotelId': hotelId
            }
        )
        if 'Item' not in item:
            return None
        return Hotel(hotelId, item['Item']['HotelName'], item['Item']['email'] , item['Item']['Address'], item['Item']['Country'], item['Item']['ownerId'])
    except ClientError as e:
        return returnResponse(400, e.response['Error']['Message'])

def getBranch(branchId, hotelId):
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['AWS_REGION'])
    branchTable = dynamodb.Table(os.environ['TABLE_BRANCH'])
    try:
        item = branchTable.get_item(
            TableName=os.environ['TABLE_BRANCH'],
            Key={
                'branchId': branchId,
                'hotelId': hotelId
            }
        )
        if 'Item' not in item:
            return None
        return Branch(branchId, item['Item']['hotelId'], item['Item']['Address'], item['Item']['Country'], item['Item']['email'], item['Item']['ownerId'])
    except ClientError as e:
        return returnResponse(400, e.response['Error']['Message'])

# Should return all branches inside of DynamoDB table
def getBranchAll(hotelId):
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['AWS_REGION'])
    branchTable = dynamodb.Table(os.environ['TABLE_BRANCH'])
    try:
        item = branchTable.scan(
            ProjectionExpression = "branchId, BranchName, email, ownerId, Address",
            FilterExpression = Attr('hotelId').eq(hotelId)
        )
        logger.debug('[DEBUG] item: {}'.format(item))
        if 'Items' not in item:
            return None
        if len(item['Items']) == 0:
            return None
        return item['Items']
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