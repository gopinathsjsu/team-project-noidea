class User:
    def __init__(self, name, email, address):
        self.fName = name[0]
        self.lName = name[1]
        self.address = address
        self.email = email
    
    def getName(self):
        return [self.fName, self.lName]

    def getEmail(self):
        return self.email
    
    def getAddress(self):
        return self.address

    def setName(self, name):
        self.fName = name[0]
        self.lName = name[1]
    
    def setEmail(self, email):
        self.email = email
    
    def setAddress(self, address):
        self.address = address
    
