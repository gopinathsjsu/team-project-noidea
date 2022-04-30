class Branch:
    def __init__(self, branchId, hotelId, branchAddress, branchCountry, branchEmail, branchName):
        self.id = branchId
        self.hotelId = hotelId
        self.address = branchAddress
        self.country = branchCountry
        self.email = branchEmail
        self.name = branchName
    
    def toJson(self):
        return {
            'id': self.id,
            'hotelId': self.hotelId,
            'address': self.address,
            'country': self.country,
            'email': self.email,
            'branchName': self.branchName
        }

    def toDict(self):
        return {
            'branchId': self.id,
            'hotelId': self.hotelId,
            'Address': self.address,
            'Country': self.country,
            'email': self.email,
            'BranchName': self.name
        }