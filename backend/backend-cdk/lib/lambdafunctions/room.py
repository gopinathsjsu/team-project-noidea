import json
import logging
import decimal
import os
import boto3
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

from constants.RoomType import RoomType
from classes.Amenity import Amenity
from classes.Room import Room
from constants.NoItemError import NoitemError
from DAOimpl.RoomDAOimpl import RoomDAOimpl
from DAOimpl.AmenitiesDAOimpl import AmenitiesDAOimpl

region = os.environ["region"]
room_table = os.environ["room_table"]
amenity_table = os.environ["amenity_table"]

roomTable = boto3.resource("dynamodb", region).Table(room_table)
amenityTable = boto3.resource("dynamodb", region).Table(amenity_table)
amenitiesDAOimpl = AmenitiesDAOimpl()
roomDaoimpl = RoomDAOimpl()

def room_handler(event, context):
    logger.info("**** Start room service --->")
    eventBody = event
    if type(event) == str:
        eventBody = event
    if "body" in eventBody:
        eventBody = eventBody["body"]
    else:
        return returnResponse(400, {"message": "Invalid input, no `body` in request"})
    if "roomInfo" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no roomInfo'})
    
    roomInfo = eventBody["roomInfo"]
    roomType = roomInfo["roomType"]
    if not RoomType.loopType(roomType):
        return returnResponse(400, "No such {} room type".format(roomType))

    # Generate room based on roomInfo and amenity obj
    room_object = Room(roomInfo)
    room_item = room_object.getRoomInfo()
    roomDaoimpl.addRoom(room_item)
    
    return returnResponse(200, {"roomId" : room_object.getId()})

def roomInfo_handler(event, context):
    logger.info("**** Start retreving roomInfo service --->")
    logger.debug('event:{}'.format(json.dumps(event)))
    eventBody = event['queryStringParameters']

    if "roomId" not in eventBody:
        return returnResponse(400, {"message": "Invalid input, no roomId"})
    try:
        roomId = eventBody["roomId"]
        roomInfo = roomDaoimpl.getRoom(roomId)
        if roomInfo == None:
            return returnResponse(400, {"message" : "roomId NO FOUND"})
        return returnResponse(200, roomInfo)
        
    except NoitemError as ne:
        return returnResponse(400, str(ne))

    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, "Something wrong with roomInfo_handler()")

def roomType_handler(event, context):
    logger.info("**** Start change roomtType service --->")
    logger.debug('event:{}'.format(json.dumps(event)))

    eventBody = event
    if type(event) == str:
        eventBody = event
    if "body" in eventBody:
        eventBody = eventBody["body"]
    else:
        return returnResponse(400, {"message": "Invalid input, no body"})

    if "roomId" not in eventBody and "roomType" not in eventBody:
        return returnResponse(400, {"message": "Invalid input, no roomId/roomType"})

    roomId = eventBody["roomId"]
    roomType = eventBody["roomType"]
    roomTypeDict = {"roomType" : roomType}
    if not RoomType.loopType(roomType):
        return returnResponse(400, {"message": "Invalid roomType input"})
    try:
        roomDaoimpl.updateRoom(roomId, roomTypeDict)
        return returnResponse(200, "Update roomType to {} succeeded".format(roomType))
    
    except NoitemError as ne:
        return returnResponse(400, str(ne))
    
    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, "Something wrong with roomType_handler()")
def allrooms_handler(event, conext):
    logger.info("**** Start get all rooms service --->")
    try:
        allrooms = roomDaoimpl.getAllRooms()
    except Exception as e:
        return returnResponse(400, str(e))
    return returnResponse(200, allrooms)

def allamenity_handler(event, conext):
    logger.info("**** Start get all amenity service --->")
    try:
        allamenity = amenitiesDAOimpl.getAllAmenities()
    except Exception as e:
        return returnResponse(400, str(e))
    return returnResponse(200, allamenity)

def amenity_handler(event, context):
    logger.info("**** Start change amenity service --->")
    logger.debug('event:{}'.format(json.dumps(event)))
    
    eventBody = event
    if type(event) == str:
        eventBody = event
    if "body" in eventBody:
        eventBody = eventBody["body"]
    else:
        return returnResponse(400, {"message": "Invalid input, no queryStringParameters"})

    if "amenityInfo" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no amenityInfo'})
    if "amenityId" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no amenityId'})
    amenityInfo = eventBody["amenityInfo"] 
    amenityId = eventBody["amenityId"]
    try:
        amenitiesDAOimpl.updateAmenity(amenityId, amenityInfo)
        return returnResponse(200, "Update amenity succeeded")

    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, "Something wrong with roomType_handler()")

def amenityInfo_handler(event, context):
    logger.info("**** Start retreving amenityInfo service --->")
    logger.debug('event:{}'.format(json.dumps(event)))
    eventBody = event['queryStringParameters']

    if "amenityId" not in eventBody:
        return returnResponse(400, {"message": "Invalid input, no queryStringParameters"})
    try:
        amenityId = eventBody["amenityId"]
        amenityInfo = amenitiesDAOimpl.getAmenity(amenityId)
        return returnResponse(200, amenityInfo)
    
    except NoitemError as ne:
        return returnResponse(400, str(ne))

    except Exception as e:
        logger.debug(str(e))
        return returnResponse(400, "Something wrong with amenityInfo_handler()")
def createamenity_handler(event, context):
    
    logger.info("**** Start room service --->")
    eventBody = event
    if type(event) == str:
        eventBody = event
    if "body" in eventBody:
        eventBody = eventBody["body"]
    else:
        return returnResponse(400, {"message": "Invalid input, no `body` in request"})
    if "amenityIfo" not in eventBody:
        return returnResponse(400, {'message': 'Invalid input, no amenityIfo'})
    
    amenityIfo = eventBody["amenityIfo"]
    
    # Generate room based on roomInfo and amenity obj
    amenityObj = Amenity(amenityIfo)
    amenityItem = amenityObj.getAmenitysInfo()
    amenitiesDAOimpl.addAmenity(amenityItem)
    
    return returnResponse(200, {"amenityId" : amenityObj.getId()})

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