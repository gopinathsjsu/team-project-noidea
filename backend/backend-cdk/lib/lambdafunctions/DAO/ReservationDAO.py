
from abc import ABC, abstractmethod

class ReservationDAO(ABC):
    @abstractmethod
    def getAllReservation(self):
        pass
    @abstractmethod
    def getReservation(self, reservationId):
        pass
    @abstractmethod
    def updateReservation(self, reservationId, filed: dict):
        pass
    @abstractmethod
    def deleteReservation(self, reservationId):
        pass
    @abstractmethod
    def addReservation(self, reservation_item):
        pass
