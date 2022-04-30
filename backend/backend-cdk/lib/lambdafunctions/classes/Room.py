import uuid
import json
import sys
sys.path.append("..")

from constants.RoomType import RoomType

class Room:

    def __init__(self, roomInfor) -> None:
        self.id = str(uuid.uuid4())
        self.hotelId = roomInfor["hotelId"]
        self.price = 0
        self.roomType = roomInfor["roomType"]
        self.name = roomInfor["roomName"]

    def getId(self):
        return self.id

    def getHotelId(self):
        return self.hotelId
    
    def getType(self):
        return self.roomType
    def getName(self):
        return self.name
    
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
            "roomId" : self.getId(),
            "hotelId" : self.getHotelId(),
            "roomType" : self.getType(),
            "roomPrice" : str(self.getPrice()),
            "roomName" : self.getName()
        })

    def getRoomInfo(self):
        return {
            "roomId" : self.getId(),
            "hotelId" : self.getHotelId(),
            "roomType" : self.getType(),
            "roomPrice" : str(self.getPrice()),
            "roomName" : self.getName()
        }