import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
from boto3.dynamodb.conditions import Key, Attr
from constants.NoItemError import NoitemError

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
    if 'Item' in response:
        return response['Item']
    else:
        raise NoitemError(pk_value, table)

def get_items_db(table, arrtibute, arrtvalue):
    response = table.scan(
        FilterExpression=Attr(arrtibute).contains(arrtvalue)
    )
    if 'Items' in response:
        return response['Items']
    else:
        raise NoitemError(arrtvalue, table)

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