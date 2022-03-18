class Admin:
    def __init__(self, user, hotelAssignments, adminLevel):
        self.user = user

        # List of hotel assignments
        self.hotelAssignment = hotelAssignments

        # Integer, lower is stronger admin level
        self.adminLevel = adminLevel

    def getHotelAssignment(self):
        return self.hotelAssignment
    
    def setHotelAssignment(self, hotelAssignment):
        for hotel in hotelAssignment:
            self.hotelAssignment.append(hotel)

    def getAdminLevel(self):
        return self.adminLevel
    
    def setAdminLevel(self, adminLevel):
        self.adminLevel = adminLevel

    def toJson(self):
        response = self.user.toJson()
        response['hotelAssignment'] = self.hotelAssignment
        response['adminLevel'] = self.adminLevel
        return response