import json
import unittest
import lambda_function

class TestHanderCase(unittest.TestCase):
    def test_response(self):
        print("testing valid response")
        u = lambda_function.User(["hello", "world"], "test@gmail.com", "address")
        response = lambda_function.lambda_handler(None, None)
        print(response)
        self.assertEqual(response['statusCode'], 200)
        self.assertEqual(response['body'], json.dumps(u))

        print("testing invalid response")
        response = lambda_function.lambda_handler(None, None)
        self.assertEqual(response['statusCode'], 400)
        self.assertEqual(response['body'], json.dumps({'errorMessage': 'Invalid input'}))