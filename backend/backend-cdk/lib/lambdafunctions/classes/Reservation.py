import uuid
import json
import sys
from decimal import Decimal
sys.path.append("..")
from strategy.PriceCalculationContext import PriceCalculationContext
from strategy.PriceCalculationStrategy import LoyaltyPlatinum, LoyaltyGlod, LoyaltySilver, LoyaltyBronzer, SummerSeason, ChristmasSeason, RegularSeason, Weekdays, Weekends, Holidays
from associate.amenityTotalPrice import amenityTotalPrice
from classes.Room import Room
from classes.User import User
from constants.Season import Season
from constants.Days import Days
from constants.ReservationStatus import ReservationStatus

class Reservation:
    def __init__(self, startDate, endDate, season, days, room: Room, customer: User, amenityIds : list) -> None:
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
        self.checkIn = False
        self.checkOut = False
        self.amenityIds = amenityIds
        self.amenityPrice = -1
        
    def getId(self):
        return self.id

    def getStartDate(self):
        return self.startDate
    
    def getEndDate(self):
        return self.endDate

    def setStatus(self, status):
        self.status = status

    def getStatus(self) : 
        return self.status
    
    def getamenityPrice(self):
        if self.amenityPrice == -1 :
            self.amenityPrice = amenityTotalPrice(self.amenityIds)
        return self.amenityPrice
    
    def getLoyalPrice(self):
        roomAndAmentyPrice = float(self.room.getPrice()) + float(self.getamenityPrice())
        loyaltyPoint = self.customer.getLoyalty()
        print("the room price is {}".format(roomAndAmentyPrice))
        royalprice = 0
        if loyaltyPoint >= 20 and loyaltyPoint < 50:

            bronzerCal = LoyaltyBronzer()
            ctx = PriceCalculationContext(bronzerCal)
            royalprice = ctx.calculate_price(roomAndAmentyPrice)

        elif loyaltyPoint >= 50 and loyaltyPoint < 70:

            silverCal = LoyaltySilver()
            ctx = PriceCalculationContext(silverCal)
            royalprice = ctx.calculate_price(roomAndAmentyPrice)

        elif loyaltyPoint >= 70 and loyaltyPoint < 85:

            goldCal = LoyaltyGlod()
            ctx = PriceCalculationContext(goldCal)
            royalprice = ctx.calculate_price(roomAndAmentyPrice)

        elif loyaltyPoint >= 85:

            platCal = LoyaltyPlatinum()
            ctx = PriceCalculationContext(platCal)
            royalprice =  ctx.calculate_price(roomAndAmentyPrice)
        
        else:
            royalprice = roomAndAmentyPrice

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
        return self.customer.getId()
    
    def getRoomId(self):
        return self.room.getId()

    def getAmenityIds(self):
        return self.amenityIds
        
    def updateStartDate(self, newstartDate):
        self.startDate = newstartDate
    
    def updateEndate(self, newendDate):
        self.endDate = newendDate
    
    def updatePrice(self, newprice):
        self.price = newprice

    def isCheckedIn(self):
        return self.checkIn

    def setCheckedIn(self, newcheckIn):
        self.checkIn = newcheckIn

    def isCheckedOut(self):
        return self.checkOut

    def setCheckOut(self, newcheckOut):
        self.checkOut = newcheckOut

    def getReservationInfoJson(self):
        return json.dumps({
            "reservationId": self.getId(),
            "startDate" : self.getStartDate(),
            "endDate" : self.getEndDate(),
            "price" : str(self.getTotalPrice()),
            "customerId" : self.getUserId(),
            "custmoerFirstName" : self.customer.fName,
            "custmoerLastName" : self.customer.lName,
            "roomId" : self.getRoomId(),
            "hotelId" : self.room.getHotelId(),
            "checkIn" : self.isCheckedIn(),
            "checkOut" : self.isCheckedOut(),
            "reservationStatus" : self.getStatus(),
            "amenityIds" : self.getAmenityIds()
        })

    def getReservationInfo(self):
        return {
            "reservationId": self.getId(),
            "price" : str(self.getTotalPrice()),
            "userId" : self.getUserId(),
            "roomId" : self.getRoomId(),
            "hotelId" : self.room.getHotelId(),
            "amenityIds" : self.getAmenityIds(),
            "custmoerFirstName" : self.customer.fName,
            "custmoerLastName" : self.customer.lName,
            "checkIn" : self.isCheckedIn(),
            "checkOut" : self.isCheckedOut(),
            "startDate" : self.getStartDate(),
            "endDate" : self.getEndDate(),
            "seanson" : self.season,
            "days" : self.days,
            "reservationStatus" : self.getStatus()
        }

    