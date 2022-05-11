# Hootel Web Application

[Hootel Demo](https://www.youtube.com/watch?v=XywgcXuxY30) https://www.youtube.com/watch?v=XywgcXuxY30

[Frontend Link](https://main.d2pqi8z5jyvu7o.amplifyapp.com/) https://main.d2pqi8z5jyvu7o.amplifyapp.com/

**Hotel User**
- Username: hotel
- Password: Password1!

**Customer User**
- Username: customer
- Password: Password1!

## Team member and component lead

- Bryan Kwong: Building frontend and then integrate with backend
- Fuyu (Nick) Zhang: AWS account manager and BookingService and HotelService
- Patrick Daniel Bustos: LoyaltyService, UserService, HotelSearchService

## Important Links

- [AWS login](https://568187732893.signin.aws.amazon.com/console)
- [Class Zoom Link](https://sjsu.zoom.us/j/88308650468?pwd=WG50SkZyWnJtVjNxTElraU5RR3dUQT09)

## Additional Documents 

- [Customer Portal Wireframe](https://github.com/gopinathsjsu/team-project-noidea/blob/075a18c1615a945fdaec441774fabe003163d688/images/HootelCustomer%20Wireframe.pdf): You can also find this file in the `images` folder of this repository
- [Hotel Portal Wireframe](https://github.com/gopinathsjsu/team-project-noidea/blob/075a18c1615a945fdaec441774fabe003163d688/images/HootelHotel%20Wireframe.pdf): You can also find this file in the `images` folder of this repository
- [Sprint Project Journal Markdown](https://github.com/gopinathsjsu/team-project-noidea/blob/main/SprintProjectJournal.md): You can also find this in the root of this repository 
- [Sprint Prokect Journal PDF](https://github.com/gopinathsjsu/team-project-noidea/blob/main/SprintProjectJournal.pdf): You can also find this in the root of this repository 
- [Sprint Task Tracker](https://docs.google.com/spreadsheets/d/1aqYAgDQ6CF_wLG771Fm-Ln9_sL4svAPKgASDdfSET5c/edit?usp=sharing): https://docs.google.com/spreadsheets/d/1aqYAgDQ6CF_wLG771Fm-Ln9_sL4svAPKgASDdfSET5c/edit?usp=sharing

## Github Insights 

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/Screen%20Shot%202022-05-10%20at%201.46.55%20PM.png?raw=true" width="700" />

**Note:** Number of commits and amount of addition/deletion does not equate to the amount of work done. Some team members did less commits because they work on more features on their local branch before making a push. Additionally, having a low amount of additions in comparison doesn't mean that there was no work done, it means that they did not work on stories that called for creating boiler plate code for infrastructure. 

## Design Decisions

### Frontend

#### API call decorator

We utilized the decorator pattern here to consolidate error check logic for all API calls. API calls can fail at any time for any reason, and the logic for catching those error is the same for all use cases. So we used a decorator here to ensure that all API calls are wrapped by the same error checker that ensures that even if an API call fails, the app remains functional. 

```
const BlockingAPIDecorator = (callback, onError, onFinally) => {
   try {
      setGlobalLoad(true);
      callback()
   } catch (e) {
      onError()
   } finally {
      onFinally()
      setGlobalLoad(false);
   }
}

const NonBlockingAPIDecorator = (callback, onError, onFinally) => {
   try {
      callback()
   } catch (e) {
      onError()
   } finally {
      onFinally()
   }
}

BlockingAPIDecorator(() => fetch(), () => error(), () => finally())
```

#### Global State Pattern 

The Hootel frontend is managed by a global application state that is implemented by React Redux. We split the global state into three separate portion: `Context`, `GlobalUI`, and `HotelData`. 

- `Context`: The Context state managed everything that uniquely identifies this user experience. Including user type, user id, the customer's data, and the hotel's data. By using this context to drive the user experience, we can share many common component while still delivering a unique user experience for customers and hotels. 
- `GlobalUI`: The GlobalUI state managed global UI elements such as a global loading spinner and global messages (including toast, modal, and fullscreen messages).
- `HotelData`: This is data that is commonly used for the Hotel user experience but does not need to be reloaded. 

### Backend

#### DAO Pattern

In order to perform data persistence operations with a unified interface, we leveraged the DAO pattern to separate the data access interface from data access implementation. So we only need to modify the data access mechanism by changing the underlying implementation. Furthermore, it makes the code turned to be more readable and maintainable.

- please refer [here](https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/Daodiagram.png?raw=true) for the implmentation details.

#### Strategy pattern

Because the price of a room is changed dynamically, we decided to utilize the Strategy pattern to encapsulate the price calculation. This pattern solves the code bloated issue and follows the Open/Closed principle, making the code easy to maintain and improving the development efficiency.

- please refer [here](https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/strategydiagram.png?raw=true) for the implmentation details.

## Diagrams 

### Use Case Diagrams

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/HootelUseCase.png?raw=true" width="700" />

### AWS Structure Diagram

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/AWS_Diagram.png?raw=true" width="700" />

### Frontend Architecture Diagrams 

#### Frontend Flow Diagram

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/HootelFrontendFlowDiagram.png?raw=true" width="700" />

### Backend Architecture Diagrams

#### ER Diagram 

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/ERdiagram.png?raw=true" width="700" />

#### Deployment Diagrams

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/DeploymentDiagram.png?raw=true" width="700" />

#### Component Diagram 

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/componentDiagram.png?raw=true" width="700" />

#### Class Diagram
<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/ClassDiagram.png?raw=true" width="700" />

#### DAO Diagram

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/Daodiagram.png?raw=true" width="700" />

#### Strategy Diagram 

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/strategydiagram.png?raw=true" width="700" />

#### Builder Pattern
<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/BuilderPattern.jpg?raw=true" width="700" />

#### CDK Deployment

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/CDK_Deployment.png?raw=true" width="700" />

#### Jenkins Instance

<img src="https://github.com/gopinathsjsu/team-project-noidea/blob/main/images/Jenkins.png?raw=true" width="700" />

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

### Links might help
- [AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [AWS CDK](https://docs.aws.amazon.com/cdk/api/v2/)
- [React](https://reactjs.org/docs/getting-started.html)
- [Room API](https://docs.google.com/document/d/1t3MyJJL2zUlXYOuZeh2-ET4QYih5bCVO5k6ZC-PbQ_0/edit?usp=sharing)
- [Booking API && Price Factoer](https://docs.google.com/document/d/1VBQwX6kRbqK3XLQ_BqPJSb0sfNWBF2fmEiK0qF3yyoE/edit)
