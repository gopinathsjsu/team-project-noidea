from lib.lambdafunctions.strategy.Price import Price

class WeekdaysPrice(Price):
    def getPriceByDays(self):
        return 1.0

class WeekendsPrice(Price):
    def getPriceByDays(self):
        return 1.1

class HolidaysPrice(Price):
    def getPriceByDays(self):
        return 1.3
