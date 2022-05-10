import enum

class ReservationStatus(enum.Enum):
    UNCONFIRM = "UNCONFIRM"
    CONFIRM = "CONFIRMED"
    CANCEL = "CANCELED"