import json
import os
import sys
import boto3
import logging
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
sys.path.append("..")
from classes.Reservation import Reservation
from classes.Room import Room
from classes.User import User
from classes.Amenities import Amenities
from aws_helper.dynamodb import put_item_db, get_item_db

dynamodb_client = boto3.client('dynamodb')

def reservation_handler(event, context):
    # TODO implement
    logger.info("**** Start booking service --->")
    region = os.environ["region"]
    room_table = os.environ["room_table"]
    amentity_table = os.environ["amentity_table"]
    reservation_table = os.environ["reservation_table"]
    
    customerTable = boto3.resource("dynamodb", region).Table("User")
    roomTable = boto3.resource("dynamodb", region).Table(room_table)
    amentityTable = boto3.resource("dynamodb", region).Table(amentity_table)
    reservationTable = boto3.resource("dynamodb", region).Table(reservation_table)

    eventBody = event
    if type(event) == str:
        eventBody = event
    if "body" in eventBody:
        eventBody = eventBody["body"]
    else:
        return returnResponse(400, {"message": "Invalid input, no queryStringParameters"})

    # input: CustomerId, RoomId, AmentitiesInfo
    if "customerId" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no customerId'})
    if "roomId" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no roomId'})
    if "amentityInfo" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no amentityInfo'})
    if "startDate" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no startDate'})
    if "endDate" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no endDate'})
    if "season" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no season'})
    if "days" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no days'})

    customerId = eventBody["customerId"]
    roomId = eventBody["roomId"]
    amentityInfo = eventBody["amentityInfo"]
    startDate = eventBody["startDate"]
    endDate = eventBody["endDate"]
    season = eventBody["season"]
    days = eventBody["days"]

    # 1. get customer info from DynamoDB based on customerId
    customerInfo = get_item_db(customerTable, "userId", customerId)
    logger.debug("**** customerInfo ---> {}".format(customerInfo))
    
    # 2. get room info from DynamoDB based on RoomId
    roomInfo = get_item_db(roomTable, "roomId", roomId)

    # 3. generate Amentity based on the event && insert it to DynamoDB
    amentity_object = Amenities(amentityInfo)
    amentity_item = amentity_object.getAmenitiesInfo()

    try:
        put_item_db(amentity_item, amentityTable)
    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, {'message': 'Something wrong with put item to DynamoDB'})

    # 4. generate Reservation && insert it to DynamoDB
    customer = User(customerInfo["userId"], customerInfo["firstName"], customerInfo["lastName"], customerInfo["email"], customerInfo["Address"], customerInfo["Country"], customerInfo["UserRoles"])
    room = Room(roomInfo, amentity_object)
    reservation = Reservation(startDate, endDate, season, days, room, customer)
    logger.debug("**** total price ---> {}".format(reservation.getTotalPrice()))

    item = reservation.getReservationInfo()
    logger.debug("**** the reservation information {}".format(item))
    
    try:
        put_item_db(item, reservationTable)
    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, {'message': 'Something wrong with put item to DynamoDB'})
    
    # return: reservationId
    return returnResponse(200, {"reservationId" : reservation.getId()})

def returnResponse(statusCode, body):
    logger.debug("[RESPONSE] statusCode: {} body: {}".format(statusCode, body))
    logger.debug("[RESPONSE] json.dumps(body): {}".format(json.dumps(body)))
    return {
        "statusCode": statusCode,
        "body": json.dumps(body),
        "isBase64Encoded": False,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Credentials": True,
            "Content-Type": "application/json"
        }
    }
