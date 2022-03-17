import json
import logging
from User import User

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
    u = eventBody['user']
    
    u = User([u['fName'], u['lName']], u['email'], u['address'])
    return returnResponse(200, {'user': json.dumps(u.toJson())})

def returnResponse(statusCode, body):
    return {
        'statusCode': statusCode,
        'body': body
    }