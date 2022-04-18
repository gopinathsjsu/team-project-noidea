from lib.lambdafunctions.strategy.Price import Price

class SigngleRoomPrice(Price):
    def getPriceByRoomTypes(self):
        return 100

class DoubleRoomPrice(Price):
    def getPriceByRoomTypes(self):
        return 198

class TripleRoomPrice(Price):
    def getPriceByRoomTypes(self):
        return 266

class QuadRoomPrice(Price):
    def getPriceByRoomTypes(self):
        return 388

