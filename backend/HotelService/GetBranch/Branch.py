class Branch:
    def __init__(self, branchId, hotelId, branchAddress, branchCountry, branchEmail):
        self.id = branchId
        self.hotelId = hotelId
        self.address = branchAddress
        self.country = branchCountry
        self.email = branchEmail
    
    def toDict(self):
        return {
            'id': self.id,
            'hotelId': self.hotelId,
            'address': self.address,
            'country': self.country,
            'email': self.email
        }