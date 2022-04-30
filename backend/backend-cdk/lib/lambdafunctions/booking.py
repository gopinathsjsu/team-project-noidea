import json
import os
import boto3
import decimal
import logging
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

from classes.Reservation import Reservation
from classes.Room import Room
from classes.User import User
from classes.Amenity import Amenity

from constants.NoItemError import NoitemError
from constants.Season import Season
from constants.Days import Days
from constants.ReservationStatus import ReservationStatus

from DAOimpl.AmenitiesDAOimpl import AmenitiesDAOimpl
from DAOimpl.ReservationDAOimpl import ReservationDAOimpl
from DAOimpl.RoomDAOimpl import RoomDAOimpl

from aws_helper.dynamodb import get_item_db

dynamodb_client = boto3.client('dynamodb')
region = os.environ["region"]
reservation_table = os.environ["reservation_table"]
room_table = os.environ["room_table"]
amenity_table = os.environ["amenity_table"]

customerTable = boto3.resource("dynamodb", region).Table("User")
roomTable = boto3.resource("dynamodb", region).Table(room_table)
amenityTable = boto3.resource("dynamodb", region).Table(amenity_table)
reservationTable = boto3.resource("dynamodb", region).Table(reservation_table)

amenitiesDAOimpl = AmenitiesDAOimpl()
reservationDAOimpl = ReservationDAOimpl()
roomDAOimpl = RoomDAOimpl()
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
    if "userId" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no userId'})
    if "roomId" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no roomId'})
    if "amenityIds" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no amenityIds'})
    if "startDate" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no startDate'})
    if "endDate" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no endDate'})
    if "season" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no season'})
    if "days" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no days'})

    userId = eventBody["userId"]
    roomId = eventBody["roomId"]
    amenityIds = eventBody["amenityIds"]
    startDate = eventBody["startDate"]
    endDate = eventBody["endDate"]
    season = eventBody["season"]
    days = eventBody["days"]

    if not Season.loopSeason(season):
        return returnResponse(400, "The {} season is not valid".format(season))
    
    if not Days.loopDays(days):
        return returnResponse(400, "The {} days is not valid".format(days))

    # 1. Retrieve customer info from DynamoDB based on customerId
    customerInfo = get_item_db(customerTable, "userId", userId)
    logger.debug("**** customerInfo ---> {}".format(customerInfo))

    # 2. Retrieve room info from DynamoDB based on RoomId
    roomInfo = roomDAOimpl.getRoom(roomId)
    logger.debug("**** roomInfo ---> {}".format(roomInfo))

    # 3. Generate Reservation && insert it to DynamoDB
    customer = User(customerInfo["userId"], customerInfo["firstName"],customerInfo["lastName"], customerInfo["email"], customerInfo["Address"], customerInfo["Country"], customerInfo["UserRoles"])
    room = Room(roomInfo)
    reservation = Reservation(startDate, endDate, season, days, room, customer, amenityIds)
    logger.debug("**** total price ---> {}".format(reservation.getTotalPrice()))

    item = reservation.getReservationInfo()
    logger.debug("**** the reservation information {}".format(item))
    
    try:
        reservationDAOimpl.addReservation(item)

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
        return returnResponse(400, {"message": "Invalid input, no reservationId or hotelId or customerId"})

    list_reservation = []
    # Retrieve reservation based on reservationId
    try:
        if "reservationId" in eventBody:
            reservationId = eventBody["reservationId"]
            reservationinfo = reservationDAOimpl.getReservation(reservationId)
            return returnResponse(200, reservationinfo)

        # Retrieve reservation based on customerId
        if "customerId" in eventBody:
            customerId = eventBody["customerId"]
            list_reservation = reservationDAOimpl.getReservationbycustomerId(customerId)
        # Retrieve reservation based on hotelId
        if "hotelId" in eventBody:
            hotelId = eventBody["hotelId"]
            list_reservation = reservationDAOimpl.getReservationbyhotelIdId(hotelId)

        if not list_reservation:
                return returnResponse(204, list_reservation)

        return returnResponse(200, list_reservation)
    except NoitemError as ne:
        return returnResponse(400, str(ne))

    except Exception as e:
        return returnResponse(400, str(e))

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
        reservationDAOimpl.updateReservation(reservationId, {"checkIn" : True})
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
        reservationDAOimpl.updateReservation(reservationId, {"checkOut" : True})

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
        reservationDAOimpl.updateReservation(reservationId, {"reservationStatus": ReservationStatus.CONFIRM.value})
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
        reservationDAOimpl.updateReservation(reservationId, {"reservationStatus" : ReservationStatus.CANCEL.value})
    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, "Someting worng with cancel_handler()")
    
    return returnResponse(200, "cancel reservation succeeded")

def getallreservation_hanlder(event, context):
    logger.info("**** Start get all reservation service --->")
    try:
        reseravations = reservationDAOimpl.getAllReservation()
    except Exception as e:
        return returnResponse(400, str(e))
    return returnResponse(200, reseravations)

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