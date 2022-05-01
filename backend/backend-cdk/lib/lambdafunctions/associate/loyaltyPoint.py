import os 
import boto3
from aws_helper.dynamodb import scan_items_db

def getloatyPoint(userid):
    region = os.environ["region"]
    loyaltyTable = boto3.resource("dynamodb", region).Table("HotelLoyalty")
    response = scan_items_db(loyaltyTable)
    for user in response:
        if userid == user["ownerId"]:
            return user["amount"]
    return 0