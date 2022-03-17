import json
import unittest
import lambda_function

class TestHanderCase(unittest.TestCase):
    def test_response_valid(self):
        print("testing valid response")
        u = lambda_function.User('user001', ["first", "last"], "test@gmail.com", "One Washington Square, San José, CA 95192", ['User', 'Customer'])
        response = lambda_function.lambda_handler({'body': {'user': {'userId': 'user001'}}}, None)
        print(response)
        self.assertEqual(response['statusCode'], 200)
        self.assertEqual(response['body']['user'], u.toJson())

    def test_response_invalid_user(self):
        print("testing invalid input")
        response = lambda_function.lambda_handler({}, None)
        self.assertEqual(response['statusCode'], 400)
        # Temp error outputs
        self.assertEqual(response['body'], {'message': 'Invalid input'})

    def test_response_invalid_name(self):
        print("testing invalid name")