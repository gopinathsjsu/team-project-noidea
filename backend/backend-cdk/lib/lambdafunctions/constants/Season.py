import enum

class Season(enum.Enum):
    SUMMER = "Summer"
    CHRISTMAS = "Christmas"
    REGULAR = "Regular"

    def loopSeason(comingStr):
        for data in Season:
            if comingStr == data.value:
                return True
        return False