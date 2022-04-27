import os
import boto3


from DAO.ReservationDAO import ReservationDAO
from aws_helper.dynamodb import update_item_db, scan_items_db, put_item_db

region = os.environ["region"]
reservation_table = os.environ["reservation_table"]
class ReservationDAOimpl(ReservationDAO):
   
    def __init__(self) -> None:
        self.reservationTable = boto3.resource("dynamodb", region).Table(reservation_table)
        self.reservations = {}

    #override
    def getAllReservation(self):
        self.reservations = scan_items_db(self.reservationTable)
        return self.reservations

    #override
    def getReservation(self, reservationId):
        self.reservations = scan_items_db(self.reservationTable)
        for reservation in self.reservations:
            if reservation.get("reservationId") == reservationId:
                return reservation
        return None

    
    #override
    def updateReservation(self, reservationId, fileds: dict):
        
        try:
            for key in fileds:
                update_item_db(self.reservationTable, "reservationId", reservationId, key, fileds.get(key))
            return True
        except Exception as e:
            return str(e)

    #override
    def deleteReservation(self, reservationId):
        pass
    
    # Override
    def addReservation(self, reservation_item):
        put_item_db(self.reservationTable, reservation_item)
        return True

    def getReservationbycustomerId(self, customerId):
        self.reservations = scan_items_db(self.reservationTable)
        list = []
        for reservation in self.reservations:
            if reservation.get("customerId") == customerId:
                list.append(reservation)
        if list:
            return list
        
        return None

    def getReservationbyhotelIdId(self, hotelId):
        self.reservations = scan_items_db(self.reservationTable)
        list = []
        for reservation in self.reservations:
            if reservation.get("hotelId") == hotelId:
                list.append(reservation)
        if list:
            return list
        
        return None

