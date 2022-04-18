import uuid
import json
import sys
sys.path.append("..")

from constants.RoomType import RoomType
from classes.Amenities import Amenities

class Room:

    def __init__(self, roomInfor, amentity: Amenities) -> None:
        self.id = roomInfor["roomId"]
        self.hotelId = roomInfor["hotelId"]
        self.price = 0
        self.roomType = roomInfor["roomType"]
        self.amentity = amentity

    def getId(self):
        return self.id

    def getHotelId(self):
        return self.hotelId

    def getAmenitiesId(self):
        return self.amenitiesId

    def getType(self):
        return self.roomType
    
    def setStatus(self, roomstatus) :
        self.roomStatus = roomstatus

    def geStatus(self):
        return self.roomStatus

    def setAmentity(self, amentity):
        self.amentity = amentity
    
    def getAmentity(self):
        return self.amentity

    def getPrice(self):
        if (self.roomType == RoomType.SINGLE.value):
            return 100
        elif (self.roomType == RoomType.DOUBLE.value):
            return 198
        elif (self.roomType == RoomType.TRIPE.value):
            return 289
        elif (self.roomType == RoomType.QUAD.value):
            return 369
        else:
            return "no such room type"

    def updateHotelId(self, newhotelId):
        self.hotelId = newhotelId
    
    def updateAmenitiesId(self, newamenitiesId):
        self.amenitiesId = newamenitiesId

    def updateRoomType(self, newroomType):
        self.roomType = newroomType

    def getRoomInfoJson(self):
        return json.dumps({
            "roomId" : self.id,
            "hotelId" : self.hotelId,
            "amenitiesId" : self.amentity.id,
            "roomType" : self.roomType,
            "roomStatus" : self.roomStatus
        })

    def getRoomInfo(self):
        return {
            "roomId" : self.id,
            "hotelId" : self.hotelId,
            "amenitiesId" : self.amentity.id,
            "roomType" : self.roomType,
            "roomStatus" : self.roomStatus
        }