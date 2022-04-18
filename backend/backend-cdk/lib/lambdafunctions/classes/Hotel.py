import uuid
import json

class Hotel:
    def __init__(self, address, email, phoneNumer, rooms: list) -> None:
        self.id = str(uuid.uuid4())
        self.email = email
        self.address = address
        self.phoneNumer = phoneNumer
        self.rooms = rooms #list of rooms
    def getId(self):
        return self.id
    
    def getEmail(self):
        return self.email

    def getAddress(self):
        return self.address
    
    def getPhoneNumber(self):
        return self.phoneNumer
    
    def getRooms(self) -> list:
        return self.rooms
    
    