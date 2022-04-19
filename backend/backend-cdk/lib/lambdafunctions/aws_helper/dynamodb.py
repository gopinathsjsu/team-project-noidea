import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
from boto3.dynamodb.conditions import Key, Attr

def put_item_db(item, table):

    table.put_item(Item=item)
    logger.debug("Inserted the {} in DynamoDB".format(item))

def get_item_db(table, PK, pk_value):
    response = table.get_item(
        Key={
            PK : pk_value
        }
    )
    logger.debug("Response from get_item_db {}".format(response))
    return response['Item']

def get_items_db(table, arrtibute, arrtvalue):
    response = table.scan(
        FilterExpression=Attr(arrtibute).contains(arrtvalue)
    )
    data = response['Items']
    return data

def update_item_db(table, primary_key, primary_val, attr, update):
    table.update_item(
            Key={primary_key: primary_val},
            UpdateExpression="set {} =:r".format(attr),
            ExpressionAttributeValues={
                ":r": update,
            },
        )
        
def delte_item_db(table, primary_key: str, primary_val: str):
    
    logger.info("Delete {} in DynamoDB".format(primary_val))

    table.delete_item(Key={
        primary_key: primary_val
    })