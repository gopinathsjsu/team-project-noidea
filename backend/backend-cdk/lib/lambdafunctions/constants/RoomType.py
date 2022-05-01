import enum

class RoomType(enum.Enum):
    SINGLE = "Single"
    DOUBLE = "Double"
    Triple = "Triple"
    QUAD = "Quad"

    def loopType(comingStr):
        for data in RoomType:
            if comingStr == data.value:
                return True
        return False