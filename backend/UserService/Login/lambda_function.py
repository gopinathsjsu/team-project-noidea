import json
import logging
import boto3
import os
from User import User
from botocore.exceptions import ClientError

from dotenv import load_dotenv
load_dotenv()

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
        return {
            'statusCode': 400,
            'body': {
                'message': 'Invalid input'
            }
        }

    # Remove keys and regions when done
    dynamodb = boto3.resource('dynamodb', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'], aws_secret_access_key=os.environ['AWS_SECRET_KEY_ID'], region_name=os.environ['AWS_REGION'])
    userTable = dynamodb.Table(os.environ['TABLE_USER'])
    try:
        item = userTable.get_item(
            TableName=os.environ['TABLE_USER'],
            Key={
                'userId': eventBody['user']['userId']
            }
        )
        u = User(item['Item']['userId'], [item['Item']['firstName'], item['Item']['lastName']], item['Item']['email'], item['Item']['Address'], list(item['Item']['Roles']))
    except ClientError as e:
        return returnResponse(400, json.dumps(e.response['Error']['Message']))
    return returnResponse(200, {'user': u.toJson()})

def returnResponse(statusCode, body):
    return {
        'statusCode': statusCode,
        'body': body
    }