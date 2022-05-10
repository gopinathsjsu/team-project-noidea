import boto3
import os
import pytest

from moto import mock_s3, mock_dynamodb2

os.environ["region"] = "us-east-1"
os.environ["room_table"] = "test_table"
os.environ["amenity_table"] = "test_table1"
os.environ["reservation_table"] = "test_table2"
os.environ["loyalty_table"] = "test_table3"
os.environ["User"] = "User"
@pytest.fixture 
def aws_credentials():
    """Mocked AWS Credentials for moto."""
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"
    os.environ["region"] = "us-east-1"
    os.environ["room_table"] = "test_table"

@pytest.fixture(autouse=True)
def change_test_dir(request, monkeypatch):
    monkeypatch.chdir(request.fspath.dirname)
@pytest.fixture
def s3(aws_credentials):
    with mock_s3():
        yield boto3.client('s3', region_name='us-east-1')

@pytest.fixture
def dynamodb_client(aws_credentials):
    with mock_dynamodb2():
        conn = boto3.client("dynamodb", region_name="us-east-1")
        yield conn