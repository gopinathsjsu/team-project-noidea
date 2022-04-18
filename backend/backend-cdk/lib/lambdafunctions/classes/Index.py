from Reservation import Reservation
from Room import Room
from User import User
from Amenities import Amenities

amen = Amenities({"dailyConBreakfast":True, "fitnessRoomAccess" : True, "swimmingPollAccess" : True, "jacuzziiAccess" : False, "dailyParkin" : False, "allmeals" : True})
customer = User("111","Nick", "abc@abc.com", "lick ave", "US", "manager")
sinroom = Room("111","Single", amen)
reser = Reservation("08/20/2022", "08/22/2022", "Summer", "Holidays", 2, sinroom, customer)

# Room price
print("user role is {}".format(customer.getLoyalty()))
print("the season is {}".format(reser.season))
print("the days is {}".format(reser.days))
print("Total price of the room is {}".format(reser.getTotalPrice()))
print( "---------")
# Check in && Check out
reser.setCheckedIn(True)
print(reser.room.geStatus())
reser.setCheckOut(True)
print(reser.room.geStatus())
print( "---------")
# Get Amantity information
print(sinroom.getAmentity().getAmenitiesInfo())