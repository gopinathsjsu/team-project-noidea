import uuid
import json

class Hotel:
    def __init__(self, hotelId, hotelName, hotelEmail, hotelAddress, hotelCountry):
        self.id = hotelId
        self.name = hotelName
        self.address = hotelAddress
        self.country = hotelCountry
        self.email = hotelEmail

    def getId(self):
        return self.id
    
    def getEmail(self):
        return self.email

    def getAddress(self):
        return self.address
    
    def toDict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'country': self.country,
            'email': self.email
        }
    
    