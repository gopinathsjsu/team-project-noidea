import os
import boto3
import sys 
sys.path.append("..") 
from DAO.RoomDAO import RoomDAO
from aws_helper.dynamodb import update_item_db, scan_items_db, put_item_db

region = os.environ["region"]
room_table = os.environ["room_table"]
class RoomDAOimpl(RoomDAO):
   
    def __init__(self) -> None:
        self.roomTable = boto3.resource("dynamodb", region).Table(room_table)
        self.rooms = {}
    #override
    def getAllRooms(self):
        self.rooms = scan_items_db(self.roomTable)
        return self.rooms

    #override
    def getRoom(self, roomId):
        self.rooms = scan_items_db(self.roomTable)
        for room in self.rooms:
            if room.get("roomId") == roomId:
                return room
        return None
    #override
    def updateRoom(self, roomId, fileds: dict):
        
        try:
            for key in fileds:
                update_item_db(self.roomTable, "roomId", roomId, key, fileds.get(key))
            return True
        except Exception as e:
            return str(e)

    #override
    def deleteRoom(self, roomId):
        pass
    
    # Override
    def addRoom(self, room_item):
        put_item_db(self.roomTable, room_item)
        return True

