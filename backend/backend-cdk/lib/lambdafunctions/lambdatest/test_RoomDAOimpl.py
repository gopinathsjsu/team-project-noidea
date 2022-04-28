
from lib.lambdafunctions.DAOimpl.RoomDAOimpl import RoomDAOimpl

from moto import mock_dynamodb2
import unittest
import boto3

@mock_dynamodb2
class test_RoomDAPimpl(unittest.TestCase):
    def test_getAllRooms(self):
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

        data2 = {
                    'roomId':'room002',
                    'customerId':'customertest',
                    'hotelId': 'hotelIdtest'       
                }

        
        roomDaoimpl = RoomDAOimpl()
        roomDaoimpl.addRoom(data1)
        roomDaoimpl.addRoom(data2)
        response = roomDaoimpl.getAllRooms()
        assert len(response) == 2
        assert data1 == response[0]
        assert data2 == response[1]

    def test_getRoom_happy(slef):
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
        response = roomDaoimpl.getRoom("room001")
        assert data1 == response

    def test_getRoom_failed(slef):
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
        response = roomDaoimpl.getRoom("room002")
        assert None == response

    def test_updateRoom_happy(slef):
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
        roomDaoimpl.addRoom(data1)
        fields = {"roomType" : "Double"}
        response = roomDaoimpl.updateRoom("room001", fields)
        assert True == response
    
    def test_addRoom(self):
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
        dataresponse = roomDaoimpl.getRoom("room001")
        assert True == response
        assert data1 == dataresponse