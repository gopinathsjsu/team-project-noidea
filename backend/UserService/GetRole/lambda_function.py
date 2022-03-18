import os
import boto3
import json
import logging
from User import User
from Customer import Customer
from Admin import Admin
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
    
    if 'user' not in eventBody: 
        return returnResponse(400, {'message': 'Invalid input, no user'})
    
    userId = eventBody['user']['userId']
    roleRequested = eventBody['user']['role']

    # Remove keys and regions when done
    dynamodb = boto3.resource('dynamodb', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'], aws_secret_access_key=os.environ['AWS_SECRET_KEY_ID'], region_name=os.environ['AWS_REGION'])
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
        u = User(item['Item']['userId'], [item['Item']['firstName'], item['Item']['lastName']], item['Item']['email'], item['Item']['Address'], item['Item']['Country'], list(item['Item']['Roles']))
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
        admin = Admin(u, item['Item']['branchAssigments'], item['Item']['adminLevel'])
        return returnResponse(200, {'user': admin.toJson()})

    else:
        return returnResponse(400, {'message': 'Invalid role requested'})

def returnResponse(statusCode, body):
    return {
        'statusCode': statusCode,
        'body': body
    }