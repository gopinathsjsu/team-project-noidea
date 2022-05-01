<sup> For more details please refer to 
- https://docs.google.com/document/d/1VBQwX6kRbqK3XLQ_BqPJSb0sfNWBF2fmEiK0qF3yyoE/edit?usp=sharing 
- https://docs.google.com/document/d/1t3MyJJL2zUlXYOuZeh2-ET4QYih5bCVO5k6ZC-PbQ_0/edit?usp=sharing<sup/>
# /booking [POST]
## This endpoint is used to create a reservation in service side.
- Requires body only (all fields required)
	- userId: String
	- roomId: String
	- amentityInfo: List of boolean
	- startDate: String
	- endDate: String
	- season: String
	- days: String
# /reservationInfo [GET]

## This endpoint is used to retrieve reservation information. 
It returns list of reservation informations if the queryStringParameters is customerId. 
It returns list of reservation informations if the queryStringParameters is hotelId. 
It returns a reservation information if the queryStringParameters is reservationId.
- Request fields (use one of them to get reservation information)
  - customerId : String
  - hotelId: String
  - reservationId : String

# /checkin [PATCH]
## This enpoint is used to update a reservation and room checkin status
- Requires body only
  - reservationId: String

# /checkout [PATCH]
## This enpoint is used to update a reservation and room checkout status
- Requires body only
  - reservationId: String

# /confirm[PATCH]
## This enpoint is used to confirm a reservation
- Requires body only
  - reservationId: String

# /cancel [DELETE]
## This enpoint is used to cancle a reservation
- Requires body only
  - reservationId: String

# /amenity [PATCH]
## This endpoint is used to udpate amenity information. 
- Requires body only
  - amenityInfo: Object
```
Request Example:
{
    "body" : {
	"amenityId": "amenity001",
	"amenityInfo" : {
	    "allmeals" : false,
	    "dailyParking" : false
	}
    }
 }
```
# /amenityinfo[GET]
## This endpoint is used to get amenity information.
- Request field
  - amenityId

# /room[POST]
## This endpoint is used to creat room.
- Requires body only
  - amenityInfo: Object
  - roomInfo: Object
```
Example:
{
    "body" : {
    "amenityInfo" : {
	"amenityId" : "amenitytest",
	"dailyContinentalBreakfast" : True,
	"accesstoFinessRoom" : True,
	"accesstoSummingPool" : True,
	"accesstoJacuzzi" : True,
	"dailyParking" : True,
	"allmeals": True
    },
    "roomInfo" : {"roomId" : "room001", "hotelId" : "hotel001", "roomType" : "Single"}
    }
}

```
# /roominfo[GET]
## This endpoint is used to get room information.
- Request field
  - roomId: String


# /roomtype[PATCH]
## This endpoint is used to udpate room type. 
- Requires body only
  - roomId: String
  - roomType: String



