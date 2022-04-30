import sys
sys.path.append("..")
from DAOimpl.AmenitiesDAOimpl import AmenitiesDAOimpl
from classes.Amenity import Amenity
amenitiesDAOimpl  = AmenitiesDAOimpl()
def amenityTotalPrice(amenityIds) :
    amenityTotalPrice = 0
    for amenityId in amenityIds:
        amenityInfo = amenitiesDAOimpl.getAmenity(amenityId)
        amenityPrice = Amenity(amenityInfo).getPrice()
        amenityTotalPrice += float(amenityPrice)
    return amenityPrice