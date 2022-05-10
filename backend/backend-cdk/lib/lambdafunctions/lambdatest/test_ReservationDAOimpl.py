from lib.lambdafunctions.DAOimpl.ReservationDAOimpl import ReservationDAOimpl

from moto import mock_dynamodb2
import unittest
import boto3

@mock_dynamodb2
class test_ReservationDAOimpl(unittest.TestCase):
    def test_getAllReservation(self):
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
           
                "reservationId" : "reservationtest1",
                "userId" : "customertest",
                "roomId" : "roomtest",
                "startDate" : "08/02/2022",
                "endDate" : "08/03/2022",
                "season" : "Summer",
                "days" : "Regular"

            
        }
        data2 = {
            
                "reservationId" : "reservationtest",
                "userId" : "customertest2",
                "roomId" : "roomtest2",
                "startDate" : "08/02/2023",
                "endDate" : "08/03/2023",
                "season" : "Summer",
                "days" : "Regular"

            
        }
        
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        reservationDAOimpl.addReservation(data2)
        response = reservationDAOimpl.getAllReservation()
        assert len(response) == 2

    def test_getReservation(self):
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
        response = reservationDAOimpl.getReservation("reservationtest")
        assert data1 == response

    def test_getReservationbyuserId(self):
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
        response = reservationDAOimpl.getReservationbycustomerId("customertest")
        assert data1 == response[0]

    def test_getReservationbyhotelIdId(self):
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
                "days" : "Regular"

            
        }
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        response = reservationDAOimpl.getReservationbyhotelIdId("hoteltest")
        assert data1 == response[0]

    def test_updateReservation(self):
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
                "days" : "Regular"

            
        }
        reservationDAOimpl = ReservationDAOimpl()
        reservationDAOimpl.addReservation(data1)
        fields = {
            "startDate" : "01/01/2001"
        }
        reservationDAOimpl.updateReservation("reservationtest", fields)
        response = reservationDAOimpl.getReservation("reservationtest")
        assert "01/01/2001" == response.get("startDate")

    def test_addReservation(self):
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
                "days" : "Regular"

            
        }
        reservationDAOimpl = ReservationDAOimpl()
        assert True == reservationDAOimpl.addReservation(data1)