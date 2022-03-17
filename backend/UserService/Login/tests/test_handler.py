import json
import unittest
import lambda_function

class TestHanderCase(unittest.TestCase):
    def test_response(self):
        print("testing valid response")
        u = lambda_function.User(["hello", "world"], "test@gmail.com", "test")
        response = lambda_function.lambda_handler({'body': {'user': u.toJson()}}, None)
        print(response)
        self.assertEqual(response['statusCode'], 200)
        self.assertEqual(response['body']['user'], json.dumps(u.toJson()))

        print("testing invalid input")
        response = lambda_function.lambda_handler({}, None)
        self.assertEqual(response['statusCode'], 400)
        # Temp error outputs
        self.assertEqual(response['body'], {'message': 'Invalid input'})

        print("testing feature not implemented")