from lib.lambdafunctions.strategy.Price import Price

class SummerPrice(Price):
    def getPriceBySeason(self):
        return 1.15

class ChristmasPrice(Price):
    def getPriceByDays(self):
        return 0.95

class RegularPrice(Price):
    def getPriceByDays(self):
        return 1.0
