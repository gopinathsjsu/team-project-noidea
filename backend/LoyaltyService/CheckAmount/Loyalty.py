class Loyalty:
    def __init__(self, loyaltyId, ownerId, amount, sharable, sharedWith):
        self.id = loyaltyId
        self.ownerId = ownerId
        self.amount = amount
        self.sharable = sharable
        self.sharedWith = sharedWith

    def toDict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'amount': float(self.amount),
            'sharable': self.sharable,
            'sharedWith': self.sharedWith
        }
    
    def canRedeem(self, amount):
        tmp = self.amount - amount
        if tmp > 0:
            return True
        else:
            return False
    
    def redeem(self, amount):
        if self.canRedeem(amount):
            self.amount = self.amount - amount
        else:
            raise Exception('[ERROR] Not enough points\nid: {}\namount: {}\nrequested: {}'.format(self.id, self.amount, amount))