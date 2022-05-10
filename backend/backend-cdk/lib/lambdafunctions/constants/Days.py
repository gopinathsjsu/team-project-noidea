import enum

class Days(enum.Enum):
    WEEKDAYS = "Weekdays"
    WEEKENDS = "Weekends"
    HOLIDAYS = "Holidays"

    def loopDays(comingStr):
        for data in Days:
            if comingStr == data.value:
                return True
        return False