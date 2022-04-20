import uuid
import json
import sys
from decimal import Decimal
sys.path.append("..")
from strategy.PriceCalculationContext import PriceCalculationContext
from strategy.PriceCalculationStrategy import LoyaltyPlatinum, LoyaltyGlod, LoyaltySilver, LoyaltyBronzer, SummerSeason, ChristmasSeason, RegularSeason, Weekdays, Weekends, Holidays

from classes.Room import Room
from classes.User import User
from constants.Season import Season
from constants.Days import Days
from constants.RoomStatus import RoomStatus
from constants.ReservationStatus import ReservationStatus

class Reservation:
    def __init__(self, startDate, endDate, season, days, room: Room, customer: User) -> None:
        self.id = str(uuid.uuid4())
        self.startDate = startDate
        self.endDate = endDate
        self.season = season
        self.price = 0
        self.days = days
        self.room = room
        self.customer = customer
        self.orignalPrice = 0
        self.status = ReservationStatus.UNCONFIRM.value
        self.ischeckedIn = False
        self.ischeckedOut = False

    def getId(self):
        return self.id

    def getStartDate(self):
        return self.startDate
    
    def getEndDate(self):
        return self.endDate

    def getConfirm(self):
        return self.confirm

    def setStatus(self, status):
        self.status = status

    def getLoyalPrice(self):
        roomPrice = self.room.getPrice()
        loyaltyPoint = self.customer.getLoyalty()
        print("the room price is {}".format(roomPrice))
        royalprice = 0
        if loyaltyPoint >= 60 and loyaltyPoint < 70:

            bronzerCal = LoyaltyBronzer()
            ctx = PriceCalculationContext(bronzerCal)
            royalprice = ctx.calculate_price(roomPrice)

        elif loyaltyPoint >= 70 and loyaltyPoint < 80:

            silverCal = LoyaltySilver()
            ctx = PriceCalculationContext(silverCal)
            royalprice = ctx.calculate_price(roomPrice)

        elif loyaltyPoint >= 80 and loyaltyPoint < 95:

            goldCal = LoyaltyGlod()
            ctx = PriceCalculationContext(goldCal)
            royalprice = ctx.calculate_price(roomPrice)

        elif loyaltyPoint >= 95 and loyaltyPoint < 100:

            platCal = LoyaltyPlatinum()
            ctx = PriceCalculationContext(platCal)
            royalprice =  ctx.calculate_price(roomPrice)
        
        else:
            royalprice = roomPrice

        print("thr price in getLoyalPrice() is {}".format(royalprice))
        return(royalprice)

    def getSeasonPrice(self):
        curS = self.season
        output = 0

        if curS == Season.SUMMER.value:
            summerS = SummerSeason()
            ctx = PriceCalculationContext(summerS)
            output = ctx.calculate_price(self.getLoyalPrice())
    
        elif curS == Season.CHRISTMAS.value:
            christmasS = ChristmasSeason()
            ctx = PriceCalculationContext(christmasS)
            output = ctx.calculate_price(self.getLoyalPrice())

        else:
            regularS = RegularSeason()
            ctx = PriceCalculationContext(regularS)
            output =  ctx.calculate_price(self.getLoyalPrice())
        print("the price in getSeasonPrice() is {}".format(output))
        return output

    def getTotalPrice(self):
        """
        total price = roomprice * loyalrate * seasonrate * daysrate
        """
        curD = self.days
        totalPrice = 0
        if curD is Days.HOLIDAYS.value:
            holidays = Holidays()
            ctx = PriceCalculationContext(holidays)
            totalPrice = ctx.calculate_price(self.getSeasonPrice())
        elif curD is Days.WEEKENDS:
            weekend = Weekends()
            ctx = PriceCalculationContext(weekend)
            totalPrice = ctx.calculate_price(self.getSeasonPrice())
        else:
            weekd = Weekdays()
            ctx = PriceCalculationContext(weekd)
            totalPrice = ctx.calculate_price(self.getSeasonPrice())
        self.price = Decimal(totalPrice).quantize(Decimal("0.00"))
        return self.price

    def getUserId(self):
        return self.customer.id
    
    def getRoomId(self):
        return self.room.id

    def updateStartDate(self, newstartDate):
        self.startDate = newstartDate
    
    def updateEndate(self, newendDate):
        self.endDate = newendDate
    
    def updatePrice(self, newprice):
        self.price = newprice

    def isCheckedIn(self):
        return self.ischeckedIn

    def setCheckedIn(self, newcheckIn):
        self.ischeckedIn = newcheckIn
        self.room.setStatus(RoomStatus.NOT_EMPTY.value)

    def isCheckedOut(self):
        return self.ischeckedOut

    def setCheckOut(self, newcheckOut):
        self.ischeckedOut = newcheckOut
        self.room.setStatus(RoomStatus.EMPTY.value)

    def getReservationInfoJson(self):
        return json.dumps({
            "reservationId": self.id,
            "startDate" : self.startDate,
            "endDate" : self.endDate,
            "price" : self.price,
            "customerId" : self.customer.id,
            "hotelId" : self.room.hotelId,
            "roomId" : self.room.id,
            "checkIn" : self.isCheckedIn(),
            "checkOut" : self.isCheckedOut(),
            "reservationStatus" : self.status,
            "amenityId" : self.room.getAmenitiesId()
        })

    def getReservationInfo(self):
        return {
            "reservationId": self.id,
            "startDate" : self.startDate,
            "endDate" : self.endDate,
            "price" : self.price,
            "customerId" : self.customer.id,
            "custmoerFirstName" : self.customer.fName,
            "custmoerLastName" : self.customer.lName,
            "roomId" : self.room.id,
            "hotelId" : self.room.hotelId,
            "checkIn" : self.isCheckedIn(),
            "checkOut" : self.isCheckedOut(),
            "reservationStatus" : self.status,
            "amenityId" : self.room.getAmenitiesId()
        }

    