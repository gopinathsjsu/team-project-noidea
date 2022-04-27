import sys
sys.path.append("..")
from lambdafunctions.DAOimpl.AmenitiesDAOimpl import AmenitiesDAOimpl
from lambdafunctions.aws_helper.dynamodb import put_item_db, get_item_db, get_items_db, update_item_db

from moto import mock_dynamodb2
import unittest
import boto3

@mock_dynamodb2
class test_AmenitiesDAOimpl(unittest.TestCase):
    def test_getAllAmenities(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table1'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'amenityId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'amenityId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        
        data1 = {
            "amenityId" : "amentiy001",
            "dailyContinentalBreakfast" : True,
            "accesstoFinessRoom" : False,
            "accesstoSummingPool" : False,
            "accesstoJacuzzi" : True,
            "dailyParking" : True,
            "allmeals" : True
        }
        data2 = {
            "amenityId" : "amentiy002",
            "dailyContinentalBreakfast" : True,
            "accesstoFinessRoom" : False,
            "accesstoSummingPool" : False,
            "accesstoJacuzzi" : True,
            "dailyParking" : True,
            "allmeals" : True
        }
        amenitiesDAOimpl = AmenitiesDAOimpl()
        amenitiesDAOimpl.addAmenity(data1)
        amenitiesDAOimpl.addAmenity(data2)
        response = amenitiesDAOimpl.getAllAmenities()
        assert 2 == len(response)

    def test_getAmenity(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table1'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'amenityId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'amenityId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        
        data1 = {
            "amenityId" : "amenity001",
            "dailyContinentalBreakfast" : True,
            "accesstoFinessRoom" : False,
            "accesstoSummingPool" : False,
            "accesstoJacuzzi" : True,
            "dailyParking" : True,
            "allmeals" : True
        }

        amenitiesDAOimpl = AmenitiesDAOimpl()
        amenitiesDAOimpl.addAmenity(data1)
        response = amenitiesDAOimpl.getAmenity("amenity001")
        assert data1 == response

    def test_updateAmenity(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table1'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'amenityId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'amenityId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        
        data1 = {
            "amenityId" : "amenity001",
            "dailyContinentalBreakfast" : True,
            "accesstoFinessRoom" : False,
            "accesstoSummingPool" : False,
            "accesstoJacuzzi" : True,
            "dailyParking" : True,
            "allmeals" : True
        }

        amenitiesDAOimpl = AmenitiesDAOimpl()
        amenitiesDAOimpl.addAmenity(data1)
        fields = {"allmeals" : False}
        response = amenitiesDAOimpl.updateAmenity("amenity001", fields)
        assert True == response

    def test_addAmenity(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table1'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'amenityId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'amenityId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        
        data1 = {
            "amenityId" : "amenity001",
            "dailyContinentalBreakfast" : True,
            "accesstoFinessRoom" : False,
            "accesstoSummingPool" : False,
            "accesstoJacuzzi" : True,
            "dailyParking" : True,
            "allmeals" : True
        }

        amenitiesDAOimpl = AmenitiesDAOimpl()
        assert True == amenitiesDAOimpl.addAmenity(data1)