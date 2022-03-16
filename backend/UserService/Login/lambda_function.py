import json
from User import User

def lambda_handler(event, context):
    u = User(["hello", "world"], "test@gmail.com", "test")
    return {
        'statusCode': 200,
        'body': json.dumps(u)
    }