import json
import os
import sys
import boto3
import decimal
import logging
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
sys.path.append("..")
from classes.Reservation import Reservation
from classes.Room import Room
from classes.User import User
from classes.Amenities import Amenities
from constants.ReservationStatus import ReservationStatus
from aws_helper.dynamodb import put_item_db, get_item_db, get_items_db, update_item_db

dynamodb_client = boto3.client('dynamodb')
region = os.environ["region"]
reservation_table = os.environ["reservation_table"]
room_table = os.environ["room_table"]
amentity_table = os.environ["amentity_table"]

customerTable = boto3.resource("dynamodb", region).Table("User")
roomTable = boto3.resource("dynamodb", region).Table(room_table)
amentityTable = boto3.resource("dynamodb", region).Table(amentity_table)
reservationTable = boto3.resource("dynamodb", region).Table(reservation_table)

def reservation_handler(event, context):
    # TODO implement
    logger.info("**** Start booking service --->")

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

    # 1. Retrieve customer info from DynamoDB based on customerId
    try:
     customerInfo = get_item_db(customerTable, "userId", customerId)
     logger.debug("**** customerInfo ---> {}".format(customerInfo))
    
    # 2. Retrieve room info from DynamoDB based on RoomId
     roomInfo = get_item_db(roomTable, "roomId", roomId)
    
    # 3. Generate Amentity based on the event && insert it to DynamoDB
     amentity_object = Amenities(amentityInfo)
     amentity_item = amentity_object.getAmenitiesInfo()
     put_item_db(amentity_item, amentityTable)

    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, {'message': 'Something wrong with put item to DynamoDB'})

    # 4. Generate Reservation && insert it to DynamoDB
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
    
    # Return: reservationId
    return returnResponse(200, {"reservationId" : reservation.getId()})

def retrieve_handler(event, context):
    logger.info("**** Start retreving reservation service --->")
    logger.debug('event:{}'.format(json.dumps(event)))
    eventBody = event['queryStringParameters']

    if "reservationId" not in eventBody and "hotelId" not in eventBody and "customerId" not in eventBody:
        return returnResponse(400, {"message": "Invalid input, no queryStringParameters"})

    # Retrieve reservation based on customerId
    if "customerId" in eventBody:
        customerId = eventBody["customerId"]
        list_reservation = get_items_db(reservationTable, "customerId", customerId)
        return returnResponse(200, list_reservation)

    # Retrieve reservation based on hotelId
    if "hotelId" in eventBody:
        hotelId = eventBody["hotelId"]
        list_reservation = get_items_db(reservationTable, "hotelId", hotelId)
        return returnResponse(200, list_reservation)

    # Retrieve reservation based on reservationId
    if "reservationId" in eventBody:
        reservationId = eventBody["reservationId"]
        reservationinfo = get_item_db(reservationTable, "reservationId", reservationId)
        return returnResponse(200, reservationinfo)

    return returnResponse(400, "Someting worng with retrieve_handler()")

def checkIn_handler(event, context):
    logger.info("**** Start checkIn service --->")
    logger.debug('event:{}'.format(json.dumps(event)))

    eventBody = event
    if type(event) == str:
        eventBody = event
    if "body" in eventBody:
        eventBody = eventBody["body"]
    else:
        return returnResponse(400, {"message": "Invalid input, no queryStringParameters"})
    
    if "reservationId" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no reservationId'})

    reservationId = eventBody["reservationId"]

    # Update status to True
    try:
        update_item_db(reservationTable, "reservationId", reservationId, "checkIn", True)
        reservationInfor = get_item_db(reservationTable, "reservationId", reservationId)

    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, "Someting worng with confirm_handler()")
    
    return returnResponse(200, "Check in succeeded")
    

def checkOut_handler(event, context):
    logger.info("**** Start checkOut service --->")
    logger.debug('event:{}'.format(json.dumps(event)))

    eventBody = event
    if type(event) == str:
        eventBody = event
    if "body" in eventBody:
        eventBody = eventBody["body"]
    else:
        return returnResponse(400, {"message": "Invalid input, no queryStringParameters"})
    
    if "reservationId" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no reservationId'})

    reservationId = eventBody["reservationId"]

    # Update status to True
    try:
        update_item_db(reservationTable, "reservationId", reservationId, "checkOut", True)
        reservationInfor = get_item_db(reservationTable, "reservationId", reservationId)

    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, "Someting worng with confirm_handler()")
    
    return returnResponse(200, "Check out succeeded")

def confirm_handler(event, context):
    logger.info("**** Start confirm service --->")
    logger.debug('event:{}'.format(json.dumps(event)))

    eventBody = event
    if type(event) == str:
        eventBody = event
    if "body" in eventBody:
        eventBody = eventBody["body"]
    else:
        return returnResponse(400, {"message": "Invalid input, no queryStringParameters"})
    
    if "reservationId" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no reservationId'})

    reservationId = eventBody["reservationId"]

    # Update status to CONFIRMED
    try:
        update_item_db(reservationTable, "reservationId", reservationId, "reservationStatus", ReservationStatus.CONFIRM.value)
    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, "Someting worng with confirm_handler()")
    
    return returnResponse(200, "update confrim succeeded")

def cancel_handler(event, context):
    logger.info("**** Start cancel service --->")
    logger.debug('event:{}'.format(json.dumps(event)))

    eventBody = event
    if type(event) == str:
        eventBody = event
    if "body" in eventBody:
        eventBody = eventBody["body"]
    else:
        return returnResponse(400, {"message": "Invalid input, no queryStringParameters"})
    
    if "reservationId" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no reservationId'})

    reservationId = eventBody["reservationId"]

    # Update status to CANCELED
    try:
        update_item_db(reservationTable, "reservationId", reservationId, "reservationStatus", ReservationStatus.CANCEL.value)
    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, "Someting worng with cancel_handler()")
    
    return returnResponse(200, "cancel reservation succeeded")

def returnResponse(statusCode, body):
    logger.debug("[RESPONSE] statusCode: {} body: {}".format(statusCode, body))
    logger.debug("[RESPONSE] json.dumps(body): {}".format(json.dumps(body, indent=4, cls=DecimalEncoder)))
    return {
        "statusCode": statusCode,
        "body": json.dumps(body, indent=4, cls=DecimalEncoder),
        "isBase64Encoded": False,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Credentials": True,
            "Content-Type": "application/json"
        }
    }

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)