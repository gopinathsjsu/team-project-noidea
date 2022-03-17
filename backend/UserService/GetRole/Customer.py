import uuid


class Customer:
    def __init__(self, user):
        self.user = user
        self.loyaltyId = None
        self.generateLoyaltyId()
        self.bookings = []
        self.currentBooking = None

    def getLoyaltyId(self):
        return self.loyaltyId

    def generateLoyaltyId(self):
        self.loyaltyId = uuid.uuid4()
    
    def getBookings(self):
        return self.bookings

    def getCurrentBooking(self):
        return self.currentBooking

    def setCurrentBooking(self, booking):
        self.currentBooking = booking
    
    def addBooking(self, booking):
        self.bookings.append(booking)

    def removeBooking(self, booking):
        self.bookings.remove(booking)

    def toJson(self):
        response = self.user.toJson()
        response['loyaltyId'] = self.loyaltyId
        response['bookings'] = self.bookings
        response['currentBooking'] = self.currentBooking
        return response