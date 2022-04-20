import enum

class RoomType(enum.Enum):
    SINGLE = "Single"
    DOUBLE = "Double"
    TRIPE = "Tripe"
    QUAD = "Quad"

    def loopType(comingStr):
        for data in RoomType:
            if comingStr == data.value:
                return True
        return False