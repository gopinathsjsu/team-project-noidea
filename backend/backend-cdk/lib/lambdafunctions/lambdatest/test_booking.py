from lib.lambdafunctions.booking import *
from lib.lambdafunctions.DAOimpl.AmenitiesDAOimpl import AmenitiesDAOimpl
from lib.lambdafunctions.DAOimpl.ReservationDAOimpl import ReservationDAOimpl
from lib.lambdafunctions.DAOimpl.RoomDAOimpl import RoomDAOimpl
from lib.lambdafunctions.constants.ReservationStatus import ReservationStatus

from lib.lambdafunctions.aws_helper.dynamodb import put_item_db
from moto import mock_dynamodb2
import unittest
import boto3

roomDaoimpl = RoomDAOimpl()
amenitiesDAOimpl = AmenitiesDAOimpl()
@mock_dynamodb2
class test_booking(unittest.TestCase):
    def test_reservation_handler(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'User'
        table = dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'userId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'userId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        user_data = {
            "userId" : "user001",
            "firstName" : "Nick",
            "lastName" : "Zhang",
            "email": "123@bb.com",
            "Address" : "123 st",
            "Country" : "USA",
            "UserRoles" : "manager"
        }
        put_item_db(table, user_data)
        
        table_name = 'test_table'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'roomId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'roomId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        room_data = {
            "roomId" : "room001", "hotelId" : "hotel001", "roomType" : "Single", "roomName" : "test", "roomPrice" : "120"
        }
        roomDaoimpl.addRoom(room_data)
        
        table_name = 'test_table1'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'amenityId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'amenityId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        amenity_data = {
            "amenityId" : "amenitytest",
            "hotelId" : "hotel001",
            "amenityName" : "lunch",
            "amenityPrice" : 12
        }
        amenitiesDAOimpl.addAmenity(amenity_data)
        
        
        table_name = 'test_table2'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'reservationId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'reservationId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        table_name = 'HotelLoyalty'
        loyatable  = dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'loyaltyId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'loyaltyId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        loyalty_data = {
            "loyaltyId" : "loyalty001",
            "amount" : 89,
            "ownerId" : "user001"
        }
        put_item_db(loyatable, loyalty_data)
        event = {
            "body": {
                "userId" : "user001",
                "branchId" : "branch001",
                "startDate" : "08/02/2021",
                "endDate" : "09/20/2021",
                "season" : "Summer",
                "days" : "Weekdays",
                "room" : [
                    {"roomId" : "room001", "amenityIds": ["amenitytest"]}
                    ]
            }
        }
        response = reservation_handler(event, "")
        assert 200 == response["statusCode"]
    
    def test_retrieve_handler_reservationId(sele):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table2'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'reservationId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'reservationId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                "reservationId" : "reservationtest",
                "userId" : "customertest",
                "roomId" : "roomtest",
                "startDate" : "08/02/2022",
                "endDate" : "08/03/2022",
                "season" : "Summer",
                "days" : "Regular"

            
        }
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        
        event = {
            "queryStringParameters" : {
                "reservationId" : "reservationtest"
            }
        }
        
        response = retrieve_handler(event, "")
        assert 200 == response["statusCode"]
    
    def test_retrieve_handler_userId(sele):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table2'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'reservationId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'reservationId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                "reservationId" : "reservationtest",
                "userId" : "customertest",
                "roomId" : "roomtest",
                "startDate" : "08/02/2022",
                "endDate" : "08/03/2022",
                "season" : "Summer",
                "days" : "Regular"

            
        }
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        
        event = {
            "queryStringParameters" : {
                "userId" : "customertest"
            }
        }
        
        response = retrieve_handler(event, "")
        assert 200 == response["statusCode"]
    
    def test_retrieve_handler_hotelId(sele):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table2'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'reservationId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'reservationId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                "reservationId" : "reservationtest",
                "userId" : "customertest",
                "roomId" : "roomtest",
                "hotelId" : "hoteltest",
                "startDate" : "08/02/2022",
                "endDate" : "08/03/2022",
                "season" : "Summer",
                "days" : "Regular",
                "checkIn" : False
            
        }
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        
        event = {
            "queryStringParameters" : {
                "hotelId" : "hoteltest"
            }
        }
        
        response = retrieve_handler(event, "")
        assert 200 == response["statusCode"]
        
    def test_checkIn_hanlder(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table2'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'reservationId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'reservationId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                "reservationId" : "reservationtest",
                "userId" : "customertest",
                "roomId" : "roomtest",
                "hotelId" : "hoteltest",
                "startDate" : "08/02/2022",
                "endDate" : "08/03/2022",
                "season" : "Summer",
                "days" : "Regular",
                "ischeckedIn" : False
            
        }
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        event = {
            "body" : {
                "reservationId" : "reservationtest"
            }
        }
        response = checkIn_handler(event, "")
        assert 200 == response["statusCode"]

    def test_checkOut_hanlder(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table2'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'reservationId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'reservationId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                "reservationId" : "reservationtest",
                "userId" : "customertest",
                "roomId" : "roomtest",
                "hotelId" : "hoteltest",
                "startDate" : "08/02/2022",
                "endDate" : "08/03/2022",
                "season" : "Summer",
                "days" : "Regular",
                "checkIn" : False,
                "checkOut" : False
            
        }
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        event = {
            "body" : {
                "reservationId" : "reservationtest"
            }
        }
        response = checkOut_handler(event, "")
        assert 200 == response["statusCode"]
        
    def test_confirm_handler(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table2'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'reservationId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'reservationId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                "reservationId" : "reservationtest",
                "userId" : "customertest",
                "roomId" : "roomtest",
                "hotelId" : "hoteltest",
                "startDate" : "08/02/2022",
                "endDate" : "08/03/2022",
                "season" : "Summer",
                "days" : "Regular",
                "ischeckedIn" : False,
                "ischeckedOut" : False,
                "reservationStatus" : ReservationStatus.UNCONFIRM.value
            
        }
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        event = {
            "body" : {
                "reservationId" : "reservationtest"
            }
        }
        response = confirm_handler(event, "")
        assert 200 == response["statusCode"]
        assert ReservationStatus.CONFIRM.value == reservationDAOimpl.getReservation("reservationtest").get("reservationStatus")
        
    def test_cancel_handler(self):
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table_name = 'test_table2'
        dynamodb.create_table(TableName=table_name,
                KeySchema=[{'AttributeName': 'reservationId','KeyType': 'HASH'}],
                AttributeDefinitions=[{'AttributeName': 'reservationId','AttributeType': 'S'}],
                ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5  
        })
        data1 = {
                "reservationId" : "reservationtest",
                "userId" : "customertest",
                "roomId" : "roomtest",
                "hotelId" : "hoteltest",
                "startDate" : "08/02/2022",
                "endDate" : "08/03/2022",
                "season" : "Summer",
                "days" : "Regular",
                "ischeckedIn" : False,
                "ischeckedOut" : False,
                "reservationStatus" : ReservationStatus.UNCONFIRM.value   
        }
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        event = {
            "body" : {
                "reservationId" : "reservationtest"
            }
        }
        response = cancel_handler(event, "")
        assert 200 == response["statusCode"]
        assert ReservationStatus.CANCEL.value == reservationDAOimpl.getReservation("reservationtest").get("reservationStatus")
        
    