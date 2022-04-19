# CheckAmount endpoint (GET) /balance
- Requires queries
  - loyaltyId: String
  - amount: Float
- Returns loyaltyId and points if valid amount

# Get Loyalty Account endpoint (GET) /loyalty-get
- Requires queries
  - userId: String
- Returns the loyalty object

# Create Loyalty Account endpoint (POST) /loyalty-create
- Requires body only
  - userId: String
- Returns the loyalty account id

# Add Points endpoint (POST) /loyalty-points-add
- Requires body
  - loyalty: object
    - loyaltyId: String
    - amount: Float
- Returns loyaltyId and new amount on requested account

# Redeem Points endpoint (POST) /loyalty-points-redeem
- Requires body
  - loyalty: object
    - loyaltyId: String
    - amount: Float
- Returns loyaltyId and new amount on requested account