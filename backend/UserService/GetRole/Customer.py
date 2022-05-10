import uuid


class Customer:
    def __init__(self, user, loyaltyId, bookings, currentBooking):
        self.user = user
        self.loyaltyId = loyaltyId
        if self.loyaltyId == -1:
            self.generateLoyaltyId()
        self.bookings = bookings
        self.currentBooking = currentBooking

    def getLoyaltyId(self):
        return self.loyaltyId

    def generateLoyaltyId(self):
        self.loyaltyId = str(uuid.uuid4())
    
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