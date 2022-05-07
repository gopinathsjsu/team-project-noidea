# Hootel Web Application

## Important Links

- [AWS login](https://568187732893.signin.aws.amazon.com/console)
- [Class Zoom Link](https://sjsu.zoom.us/j/88308650468?pwd=WG50SkZyWnJtVjNxTElraU5RR3dUQT09)

## Design Decisions

### Frontend

#### API call decorator

We utilized the decorator pattern here to consolidate error check logic for all API calls. API calls can fail at any time for any reason, and the logic for catching those error is the same for all use cases. So we used a decorator here to ensure that all API calls are wrapped by the same error checker that ensures that even if an API call fails, the app remains functional. 

```
const APIDecorator = (callback, onError, onFinally) => {
   try {
      callback()
   } catch (e) {
      onError()
   } finally {
      onFinally()
   }
}
```

## Diagrams 

### Use Case Diagrams

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/HootelUseCase.png?raw=true" width="700" />

### Frontend Architecture Diagrams 

#### Frontend Flow Diagram

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/HootelFrontendFlowDiagram.png?raw=true" width="700" />

### Backend Architecture Diagrams


## Feature Sets

- Capabale of managing many customer and many different hotel chains 
- One user can book from any hotel chain they choose

### Hotel experience 

- Hotel first time sign up experience where we get the hotel's basic information 
- Ability to add and remove branches of the hotel 
- Ability to add and remove styles of room 
- Ability to add and remove amenities
- Ability to see existing reservation at your hotel 
- Ability to cancel a customer's reservation

### Customer experience

- Customer first time sign up experience where we get the customer's basic information 
- Ability to change their credit card information 
- Ability to see existing and cancel a reservation 
- Ability to make a reservation at different hotel chains for multiple rooms at once 
- Ability to specify room type and room amenities for each room during booking 
- Ability to see loyalty status 
- Ability to get discounts on bookings the more you book through Hootel
