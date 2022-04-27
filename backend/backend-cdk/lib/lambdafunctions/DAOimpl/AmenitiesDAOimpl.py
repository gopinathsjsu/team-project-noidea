import os
import boto3
import sys
sys.path.append("..")
from lambdafunctions.DAO.AmenitiesDAO import AmenitiesDAO
from lambdafunctions.aws_helper.dynamodb import update_item_db, scan_items_db, put_item_db

region = os.environ["region"]
amenity_table = os.environ["amenity_table"]
class AmenitiesDAOimpl(AmenitiesDAO):
   
    def __init__(self) -> None:
        self.amenityTable = boto3.resource("dynamodb", region).Table(amenity_table)
        self.amenitites = {}
    #override
    def getAllAmenities(self):
        self.amenitites = scan_items_db(self.amenityTable)
        return self.amenitites

    #override
    def getAmenity(self, amenityId):
        self.amenitites = scan_items_db(self.amenityTable)
        for amenity in self.amenitites:
            if amenity.get("amenityId") == amenityId:
                return amenity
        return None
    #override
    def updateAmenity(self, amenityId, fileds: dict):
        
        try:
            for key in fileds:
                update_item_db(self.amenityTable, "amenityId", amenityId, key, fileds.get(key))
            return True
        except Exception as e:
            return str(e)

    #override
    def deleteAmenity(self, amenityId):
        pass
    
    # Override
    def addAmenity(self, amenity_item):
        put_item_db(self.amenityTable, amenity_item)
        return True

