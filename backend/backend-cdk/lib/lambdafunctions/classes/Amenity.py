import json
import uuid
class Amenity:
    def __init__(self, list_info: dict) -> None:
        self.id = str(uuid.uuid4())
        self.hotelId = list_info["hotelId"]
        self.name = list_info["amenityName"]
        self.price = list_info["amenityPrice"]
    
    def getId(self):
        return self.id
    def gethotelId(self):
        return self.hotelId
    def getName(self):
        return self.name
    def getPrice(self):
        return self.price
    
    def getAmenitysInfo(self):
        return {
            "amenityId" : self.getId(),
            "hotelId" : self.gethotelId(),
            "amenityName" : self.getName(),
            "amenityPrice" : str(self.getPrice())
        }
        
    def getAmenitiyInfoJson(self):
        return json.dumps({
            "amenityId" : self.getId(),
            "hotelId" : self.gethotelId(),
            "amenityName" : self.getName(),
            "amenityPrice" : str(self.getPrice())
        })  