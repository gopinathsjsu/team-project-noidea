import os
import boto3
import json
import logging
from User import User
from Customer import Customer
from Admin import Admin
from botocore.exceptions import ClientError
from decimal import Decimal

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
    if 'role' not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no role'})
    
    userId = eventBody['userId']
    roleRequested = eventBody['role']

    # Remove keys and regions when done
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
        u = User(item['Item']['userId'], [item['Item']['firstName'], item['Item']['lastName']], item['Item']['email'], item['Item']['Address'], item['Item']['Country'], list(item['Item']['UserRoles']))
    except ClientError as e:
        return returnResponse(400, json.dumps(e.response['Error']['Message']))
    
    if roleRequested == 'Customer':
        try:
            customerTable = dynamodb.Table(os.environ['TABLE_CUSTOMER'])
            item = customerTable.get_item(
                TableName=os.environ['TABLE_CUSTOMER'],
                Key={
                    'userId': userId
                }
            )
            if 'Item' not in item:
                return returnResponse(400, {'message': 'Invalid userId, client does not exist'})

            c = Customer(u, item['Item']['loyaltyId'], item['Item']['bookings'], item['Item']['currentBooking'])
            loyaltyTable = dynamodb.Table(os.environ['TABLE_LOYALTY'])
            item = loyaltyTable.get_item(
                TableName=os.environ['TABLE_LOYALTY'],
                Key={
                    'loyaltyId': c.loyaltyId
                }
            )
            if 'Item' not in item:
                return returnResponse(400, {'message': 'Invalid loyaltyId, id does not exist'})
            
            return returnResponse(200, {'user': c.toJson()})
        except ClientError as e:
            return returnResponse(400, json.dumps(e.response['Error']['Message']))

    elif roleRequested == 'Admin' and 'Admin' in u.role:
        try:
            adminTable = dynamodb.Table(os.environ['TABLE_ADMIN'])
            item = adminTable.get_item(
                TableName=os.environ['TABLE_ADMIN'],
                Key={
                    'userId': userId
                }
            )
        except ClientError as e:
            return returnResponse(400, json.dumps(e.response['Error']['Message']))
        if 'Item' not in item:
            print('Item error')
            return returnResponse(400, {'message': 'Invalid userId, admin does not exist or user is not an admin'})
        admin = Admin(u, item['Item']['branchAssigments'], int(item['Item']['adminLevel']))
        return returnResponse(200, {'user': admin.toJson()})

    else:
        return returnResponse(400, {'message': 'Invalid role requested'})

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