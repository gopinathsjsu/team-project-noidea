import json
import unittest
import lambda_function

class TestHanderCase(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(TestHanderCase, self).__init__(*args, **kwargs)
        self.user1 = lambda_function.User('user001', ['first', 'last'], 'test@gmail.com', 'One Washington Square, San José, CA 95192', 'USA', ['Admin', 'Customer', 'User'])
        self.user2 = lambda_function.User('user002', ['hello', 'world'], 'test2@gmail.com', 'One Washington Square, San José, CA 95192', 'USA', ['Customer', 'User'])

    def test_response_customer(self):
        print("testing valid customer response")
        response = self.lambda_handler('user001', 'Customer')
        print(response)
        self.assertEqual(response['statusCode'], 200)
        c = lambda_function.Customer(self.user1, 'loyalty001', ['booking001', 'booking002'], 'booking001')
        self.assertEqual(response['body']['user'], c.toJson())
        print()
    
    def test_response_admin(self):
        print("testing valid admin response")
        a = lambda_function.Admin(self.user1, ['branch001', 'branch002'], 0)
        response = self.lambda_handler('user001', 'Admin')
        print(response)
        self.assertEqual(response['statusCode'], 200)
        self.assertEqual(response['body']['user'], a.toJson())
        print()

    def test_response_invalid_body(self):
        print("testing invalid body")
        response = lambda_function.lambda_handler({}, None)
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], {'message': 'Invalid input, no body'})
        print()

    def test_response_no_user(self):
        print("testing no user")
        response = lambda_function.lambda_handler({'body': {}}, None)
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], {'message': 'Invalid input, no user'})
        print()

    def test_response_invalid_user(self):
        print("testing invalid user")
        response = lambda_function.lambda_handler({'queryStringParameters': {'userId': 'user999', 'role': 'Customer'}}, None)
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], {'message': 'Invalid userId, user does not exist'})
        print()

    def test_invalid_customer(self):
        print("testing invalid customer")
        response = self.lambda_handler('user002', 'Customer')
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], {'message': 'Invalid userId, client does not exist'})
        print()
    
    def test_invalid_admin(self):
        print("testing invalid admin")
        response = self.lambda_handler('user002', 'Admin')
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], {'message': 'Invalid role requested'})
        print()

    def test_invalid_role(self):
        print("testing invalid role")
        response = lambda_function.lambda_handler({'queryStringParameters': {'userId': 'user001', 'role': 'abcd'}}, None)
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], {'message': 'Invalid role requested'})
        print()
    
    def test_no_role(self):
        print("testing no role")
        response = self.lambda_handler({'queryStringParameters': {'userId': 'user001'}}, None)
        print()

    def test_invalid_loyaltyId(self):
        print("testing invalid loyaltyId")
        response = self.lambda_handler('user004', 'Customer')
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], {'message': 'Invalid loyaltyId, id does not exist'})
        print()

    def lambda_handler(self, userId, role):
        return lambda_function.lambda_handler({'queryStringParameters': {'userId': userId, 'role': role}}, None)
