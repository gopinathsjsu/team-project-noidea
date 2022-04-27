import sys
sys.path.append("..")
from lambdafunctions.room import room_handler, roomInfo_handler, roomType_handler, amenity_handler, amenityInfo_handler
from lambdafunctions.DAOimpl.RoomDAOimpl import RoomDAOimpl
from lambdafunctions.DAOimpl.AmenitiesDAOimpl import AmenitiesDAOimpl

from moto import mock_dynamodb2
import unittest
import boto3

@mock_dynamodb2
class test_room(unittest.TestCase):
    def test_room_handler_happy(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'roomId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'roomId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        table_name = 'test_table1'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'amenityId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'amenityId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        event = {
            "body" : {
            "amenityInfo" : {
                "amenityId" : "amenitytest",
                "dailyContinentalBreakfast" : True,
                "accesstoFinessRoom" : True,
                "accesstoSummingPool" : True,
                "accesstoJacuzzi" : True,
                "dailyParking" : True,
                "allmeals": True
            },
            "roomInfo" : {"roomId" : "room001", "hotelId" : "hotel001", "roomType" : "Single"}
            }
        }
        response = room_handler(event, "")
        assert 200 == response["statusCode"]
    
    def test_room_handler_failed(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table'
        table = dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'roomId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'roomId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table1'
        table = dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'amenityId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'amenityId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        event = {
            "body" : {
            "amenityInfo" : {
                "amenityId" : "amenitytest",
                "dailyContinentalBreakfast" : True,
                "accesstoFinessRoom" : True,
                "accesstoSummingPool" : True,
                "accesstoJacuzzi" : True,
                "dailyParking" : True,
                "allmeals": True
            },
            "roomInfo" : {"roomId" : "room001", "hotelId" : "hotel001", "roomType" : "KING"}
            }
        }
        response = room_handler(event, "")
        assert 400 == response["statusCode"]
    
    def test_roomInfo_handler_happy(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table'
        table = dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'roomId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'roomId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                
                'roomId':'room001',
                'customerId':'customertest',
                'hotelId': 'hotelIdtest'                        
            }
        roomDaoimpl = RoomDAOimpl()
        roomDaoimpl.addRoom(data1)
        
        event = {
            "queryStringParameters" : {
                "roomId" : "room001"
            }
        }
        response = roomInfo_handler(event, "")
        assert 200 == response["statusCode"]
    
    def test_roomInfo_handler_failed(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table'
        table = dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'roomId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'roomId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                
                'roomId':'room001',
                'customerId':'customertest',
                'hotelId': 'hotelIdtest'                        
            }
        roomDaoimpl = RoomDAOimpl()
        roomDaoimpl.addRoom(data1)
        
        event = {
            "queryStringParameters" : {
                "roomId" : "room002"
            }
        }
        response = roomInfo_handler(event, "")
        assert '{\n    "message": "roomId NO FOUND"\n}' == response["body"]

    def test_roomType_handler_happy(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table'
        
        table = dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'roomId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'roomId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                    
                    'roomId':'room001',
                    'customerId':'customertest',
                    'hotelId': 'hotelIdtest',
                    "roomType" : "Single"                        
                }
        roomDaoimpl = RoomDAOimpl()
        response = roomDaoimpl.addRoom(data1)
        event = {
            "body" : {
                "roomId" : "room001",
                "roomType" : "Double"
            }
        }
        response = roomType_handler(event, "")
        assert 200 == response["statusCode"]
    
    def test_roomType_handler_failed(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table'
        
        table = dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'roomId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'roomId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                    
                    'roomId':'room001',
                    'customerId':'customertest',
                    'hotelId': 'hotelIdtest',
                    "roomType" : "Single"                        
                }
        roomDaoimpl = RoomDAOimpl()
        response = roomDaoimpl.addRoom(data1)
        event = {
            "body" : {
                "roomId" : "room001",
                "roomType" : "King"
            }
        }
        response = roomType_handler(event, "")
        assert '{\n    "message": "Invalid roomType input"\n}' == response["body"]

    def test_amenity_handler(self):
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

        event = {
            "body" : {
                "amenityId": "amenity001",
                "amenityInfo" : {
                    "allmeals" : False,
                    "dailyParking" : False
                }
            }
        }
        response = amenity_handler(event, "")
        assert 200 == response["statusCode"]
        assert False == amenitiesDAOimpl.getAmenity("amenity001").get("dailyParking")
    
    def test_amenityInfo_handler(self):
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

        event = {
            "queryStringParameters" : {
                "amenityId": "amenity001",
                
            }
        }
        response = amenityInfo_handler(event, "")
        assert 200 == response["statusCode"]