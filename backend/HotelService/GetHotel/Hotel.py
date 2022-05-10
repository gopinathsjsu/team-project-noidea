class Hotel:
    def __init__(self, hotelId, hotelName, hotelEmail, hotelAddress, hotelCountry, ownerId):
        self.id = hotelId
        self.name = hotelName
        self.address = hotelAddress
        self.country = hotelCountry
        self.email = hotelEmail,
        self.ownerId = ownerId
    
    def toJson(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'country': self.country,
            'email': self.email
        }

    def toDict(self):
        return {
            'hotelId': self.id,
            'HotelName': self.name,
            'Address': self.address,
            'Country': self.country,
            'email': self.email,
            'ownerId': self.ownerId
        }

    def redeemRewards(self, loyaltyAccount, amount):
        if loyaltyAccount.canRedeem(amount):
            loyaltyAccount.redeem(amount)
        else:
            raise Exception('[ERROR] Not enough points\nid: {}\namount: {}\nhotel {} requested: {}'.format(loyaltyAccount.id, loyaltyAccount.amount, self.id, amount))