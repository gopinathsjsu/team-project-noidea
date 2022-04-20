[Endpoint](https://2va96t2eh7.execute-api.us-west-2.amazonaws.com/dev)

# Login endpoint (GET) /user-login
- Requires queries
  - Only 'userId' field
- Returns the user object
- Ex.
    .../user-login?userId=user001

# Register endpoint (POST) /user-register
- Requires body only (all fields required)
  - user object
    - userId: String
    - name: Array [first, last]
    - email: String
    - address: String
    - country: String
    - roles: List [User, Customer, Admin]
      - User role is required. It's the base role that everyone will be based off of
- Returns the user object
- Ex.
    {'user': {'userId': 'user001', 'name': ['first', 'last'], 'email': 'test1@gmail.com', 'address': '1234 A St.', 'country': 'USA', 'roles': ['User', 'Customer', 'Admin']}}

# Update User endpoint (POST) /user-update
- Requires body only
  - user object
    - userId: String (Required)
    - all other fields optional
- Returns the user object
- Ex.
    {'user': {'userId': 'user001', 'name': ['first', 'last'], 'email': 'test1@gmail.com', 'address': '1234 A St.', 'country': 'USA', 'roles': ['User', 'Customer', 'Admin']}}

# Get role endpoint (GET) /get-role
- Requires queries
  - 'userId' field
  - 'role' field
- Returns the object of the requested role
  - If 'admin' requested, User data + admin specific data will be appended
- Ex.
    .../get-role?userId=user001&role=Admin