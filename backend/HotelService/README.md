[Endpoint](https://2pai97g6d5.execute-api.us-west-2.amazonaws.com/dev)

# Register hotel endpoint (POST) /hotel-register
- Requires body only (all fields required)
  - hotel object
    - userId: String
    - hotelId: String
    - address: String
    - country: String
    - email: String
    - name: String

- Returns the created Hotel object
- Ex.
    {'hotel': {'hotelId': 'hotel001', 'name': Hilton, 'address': '1234 A St.', 'country': 'USA', 'email': 'hotel001@gmail.com'}}

# Update Hotel endpoint (POST) /hotel-update
- Requires body only
  - user object
    - userId: String (Required)
    - all other fields optional
- Returns the user object
- Ex.
    {'hotel': {'hotelId': 'hotel001', 'name': Hilton, 'address': '1234 A St.', 'country': 'USA', 'email': 'hotel001@gmail.com'}}

# Get Hotel endpoint (GET) /hotel-get
- Requires queries
  - 'hotelId' field
    - If 'hotelId' = '-1', then it will return a list of all hotels in the table
- Returns the object of the requested hotel

# Register branch endpoint (POST) /branch-create
- Requires body only (all fields required)
  - hotel object
    - userId: String
    - hotelId: String
    - branchId: String
    - address: String
    - country: String
    - email: String

- Returns the created Branch object
- Ex.
    {'branch': {'branchId': 'branch001', 'address': '1234 A St.', 'country': 'USA', 'email': 'hotel001branch001@gmail.com'}}

# Update Branch endpoint (POST) /branch-update
- Requires body only
  - user object
    - userId: String (Required)
    - all other fields optional
- Returns the user object
- Ex.
    {'branch': {'branchId': 'branch001', 'address': '1234 A St.', 'country': 'USA', 'email': 'hotel001branch001@gmail.com'}}

# Get Branch endpoint (GET) /branch-get
- Requires queries
  - 'hotelId' field
  - 'branchId' field
    - If 'branchId' = '-1', then it will return a list of all branches in the table for the hotelId
- Returns the object of the requested branch