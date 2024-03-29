import uuid
import json

class Amenities:
    def __init__(self, list_info: dict) -> None:
        self.id = list_info["amenityId"]
        self.daily_con_breakfast = list_info["dailyContinentalBreakfast"]
        self.acces_fitness_Room = list_info["accesstoFinessRoom"]
        self.access_swimming_pool = list_info["accesstoSummingPool"]
        self.access_jacuzzi = list_info["accesstoJacuzzi"]
        self.daily_parking = list_info["dailyParking"]
        self.allmeals = list_info["allmeals"]

    def getId(self):
        return self.id
    
    def hasDailyConBreakfast(self):
        return self.daily_con_breakfast

    def hasFitnessRoomAccess(self):
        return self.acces_fitness_Room

    def hasSwimmingPollAccess(self):
        return self.access_swimming_pool

    def hasJacuzziiAccess(self):
        return self.access_jacuzzi
    
    def hasDailyParking(self):
        return self.daily_parking
    
    def hasAllmeals(self):
        return self.allmeals
    
    def setupAllmeals(self, new_allmeals):
        self.allmeals = new_allmeals

    def setupDailyConBreakfast(self, new_daily_con_breakfast):
        self.daily_con_breakfast = new_daily_con_breakfast
    
    def setupFitnessRoomAccess(self, new_acces_fitness_Room):
        self.acces_fitness_Room = new_acces_fitness_Room

    def setupSwimmingPollAccess(self, new_access_swimming_pool):
        self.access_swimming_pool = new_access_swimming_pool
    
    def setupJacuzziiAccess(self, new_access_jacuzzi):
        self.access_jacuzzi = new_access_jacuzzi
    
    def setupDailyParking(self, new_daily_parking):
        self.daily_parking = new_daily_parking

    def getAmenitiesInfoJson(self):
        return json.dumps({
            "amenityId" : self.id,
            "dailyContinentalBreakfast" : self.daily_con_breakfast,
            "accesstoFinessRoom" : self.acces_fitness_Room,
            "accesstoSummingPool" : self.access_swimming_pool,
            "accesstoJacuzzi" : self.access_jacuzzi,
            "dailyParking": self.daily_parking,
            "allmeals" : self.allmeals
        })  

    def getAmenitiesInfo(self):
        return {
            "amenityId" : self.id,
            "dailyContinentalBreakfast" : self.daily_con_breakfast,
            "accesstoFinessRoom" : self.acces_fitness_Room,
            "accesstoSummingPool" : self.access_swimming_pool,
            "accesstoJacuzzi" : self.access_jacuzzi,
            "dailyParking": self.daily_parking,
            "allmeals" : self.allmeals
        }