from DAOimpl.RoomDAOimpl import RoomDAOimpl
from associate.amenityTotalPrice import amenityTotalPrice
from classes.Room import Room
class BookedRoom():
    def __init__(self, roomId, amenityIds) -> None:
        self.roomId = roomId
        self.amenityIds = amenityIds
        self.price = 0
        
    def getroomId(self):
        return self.roomId
    def getamenityIds(self):
        return self.amenityIds
    def getPrice(self):
        roomDaoimpl = RoomDAOimpl()
        roomInfo = roomDaoimpl.getRoom(self.roomId)
        room = Room(roomInfo)
        # room price
        roomprice = room.getPrice()
        # amenities price
        if self.amenityIds:
            amenityprice = amenityTotalPrice(self.amenityIds)
            # total
            self.price = float(roomprice) + float(amenityprice)
        else:
            self.price = roomprice
        return self.price
        