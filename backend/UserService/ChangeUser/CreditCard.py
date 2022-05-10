class CreditCard:
    def __init__(self, owner, number, cvv, expiration_date):
        self.owner = owner
        self.number = number
        self.cvv = cvv
        self.expiration_date = expiration_date
    
    def toDict(self):
        return {
            "ownerId": self.owner,
            "CardNumber": self.number,
            "CVV": self.cvv,
            "ExpirationDate": self.expiration_date
        }