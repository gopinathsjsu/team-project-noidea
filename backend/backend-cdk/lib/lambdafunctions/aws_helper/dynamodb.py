import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
   
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

def delte_item_db(table, primary_key: str, primary_val: str):
    
    logger.info("Delete {} in DynamoDB".format(primary_val))

    table.delete_item(Key={
        primary_key: primary_val
    })