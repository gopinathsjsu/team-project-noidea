class User:
    def __init__(self, userId, name, email, address, country, role):
        self.id = userId
        self.fName = name[0]
        self.lName = name[1]
        self.address = address
        self.country = country
        self.email = email
        self.role = role
    
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
    
    def getCountry(self):
        return self.country

    def setCountry(self, country):
        self.country = country

    def getRole(self):
        return self.role
    
    def setRole(self, role):
        self.role = [role]
    
    def addRole(self, role):
        self.role.append(role)
    
    def removeRole(self, role):
        self.role.remove(role)
    
    def getId(self):
        return self.id

    def toJson(self):
        self.role.sort()
        return {
            'userId': self.id,
            'fName': self.fName,
            'lName': self.lName,
            'email': self.email,
            'address': self.address,
            'country': self.country,
            'role': self.role
        }