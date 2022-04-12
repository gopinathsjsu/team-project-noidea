import json
import logging
import boto3
import os
from Hotel import Hotel
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
    return returnResponse(200, {'message': 'hotel found',
                                'status': 'success',
                                'hotel': hotel.toDict()})
    
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
            return returnResponse(400, {'message': 'Invalid hotelId, hotel does not exist'})
        return Hotel(hotelId, item['Item']['name'], item['Item']['email'] , item['Item']['Address'], item['Item']['Country'])
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