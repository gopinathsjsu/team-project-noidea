from abc import ABC, abstractmethod

class AmenitiesDAO(ABC):
    @abstractmethod
    def getAllAmenities(self):
        pass
    @abstractmethod
    def getAmenity(self, roomId):
        pass
    @abstractmethod
    def updateAmenity(self, roomId, filed: dict):
        pass
    @abstractmethod
    def deleteAmenity(self, roomId):
        pass
    @abstractmethod
    def addAmenity(self):
        pass