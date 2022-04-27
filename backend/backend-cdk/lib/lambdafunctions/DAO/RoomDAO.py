
from abc import ABC, abstractmethod

class RoomDAO(ABC):
    @abstractmethod
    def getAllRooms(self):
        pass
    @abstractmethod
    def getRoom(self, roomId):
        pass
    @abstractmethod
    def updateRoom(self, roomId, filed: dict):
        pass
    @abstractmethod
    def deleteRoom(self, roomId):
        pass
    @abstractmethod
    def addRoom(self):
        pass