from lib.lambdafunctions.strategy.Price import Price
from lib.lambdafunctions.constants.RoomType import RoomType

class LoyatyPlatinum(Price):
    """
    The Platinum customer has 15% discount
    """

    def getPrice(self):
        return float(super().getPrice() * 0.85)

class LoyatyGlod(Price):
    """
    The Glod customer has 10% discount
    """

    def getPrice(self):
        return float(super().getPrice() * 0.90)

class LoyatySilver(Price):
    """
    The Glod customer has 5% discount
    """

    def getPrice(self):
        return float(super().getPrice() * 0.95)

class LoyatyBronzer(Price):
    """
    The brozer customer has 2% discount
    """
    
    def getPrice(self):
        return float(super().getPrice() * 0.98)