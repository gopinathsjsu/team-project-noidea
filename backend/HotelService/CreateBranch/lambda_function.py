import json
import logging
import boto3
import os
from Hotel import Hotel
from Branch import Branch
from User import User
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

    if 'body' in eventBody:
        eventBody = eventBody['body']
    else:
        return returnResponse(400, {'message': 'Invalid input, no body'})
    if type(eventBody) == str:
        eventBody = json.loads(eventBody)
    
    if 'hotel' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no hotel object'})
    eventBody = eventBody['hotel']
    if 'hotelId' not in eventBody: 
        return returnResponse(400, {'message': 'Invalid input, no hotel'})
    if 'branchId' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no branch'})
    if 'address' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no address'})
    if 'country' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no country'})
    if 'email' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no email'})
    if 'userId' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no userId. Cannot validate if admin'})
    if 'name' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no name for branch'})
    u = getUser(eventBody['userId'])
    if 'Admin' not in u.role:
        return returnResponse(400, {'message': 'Invalid input, user is not an admin',
                                    'status': 'error'})
    branch = getBranch(eventBody['branchId'], eventBody['hotelId'])
    if branch is not None:
        return returnResponse(400, {'message': 'Invalid input, hotel branch exists, please modify instead',
                                    'status': 'error',
                                    'branch': branch.toJson()})
    hotel = getHotel(eventBody['hotelId'])
    if hotel is None:
        return returnResponse(400, {'message': 'Invalid input, hotel does not exist',
                                    'status': 'error'})
    branch = Branch(eventBody['branchId'], eventBody['hotelId'], eventBody['address'], eventBody['country'], eventBody['email'], eventBody['name'], eventBody['userId'])
    uploadBranch(branch)
    branch = getBranch(eventBody['branchId'], eventBody['hotelId'])
    return returnResponse(200, {'message': 'hotel created',
                                'status': 'success',
                                'hotel': hotel.toJson(),
                                'branch': branch.toJson()})

def getUser(userId):
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['AWS_REGION'])
    userTable = dynamodb.Table(os.environ['TABLE_USER'])
    try:
        item = userTable.get_item(
            TableName=os.environ['TABLE_USER'],
            Key={
                'userId': userId
            }
        )
        if 'Item' not in item:
            return returnResponse(400, {'message': 'Invalid userId, user does not exist'})
        return User(userId, [item['Item']['firstName'], item['Item']['lastName']], item['Item']['email'], item['Item']['Address'], item['Item']['Country'], item['Item']['UserRoles'])
    except ClientError as e:
        return returnResponse(400, e.response['Error']['Message'])    

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
        return Branch(branchId, item['Item']['hotelId'], item['Item']['Address'], item['Item']['Country'], item['Item']['email'], item['Item']['BranchName'], item['Item']['ownerId'])
    except ClientError as e:
        return returnResponse(400, e.response['Error']['Message'])

def uploadBranch(branch):
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['AWS_REGION'])
    branchTable = dynamodb.Table(os.environ['TABLE_BRANCH'])
    try:
        branchTable.put_item(
            Item=branch.toDict()
        )
        return True
    except ClientError as e:
        return returnResponse(400, e.response['Error']['Message'])