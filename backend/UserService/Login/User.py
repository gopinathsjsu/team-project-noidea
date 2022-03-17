class User:
    def __init__(self, userId, name, email, address, role):
        self.id = userId
        self.fName = name[0]
        self.lName = name[1]
        self.address = address
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
        return {
            'userId': self.id,
            'fName': self.fName,
            'lName': self.lName,
            'email': self.email,
            'address': self.address,
            'role': self.role
        }