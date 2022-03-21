import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createBookingLambda, createRoomLambda }  from './resource/lambda'
import { createRestAPI } from './resource/apigateway'
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { createTable } from './resource/dynamodb'
export class BackEndCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const APIBooking = createRestAPI(this, 'Hotel-Booking');
    const APIRoom = createRestAPI(this, 'Hotel-Room');

    new CfnOutput(this, "BookingEndpoint", {
      value: APIBooking.urlForPath("/booking")
    });
    new CfnOutput(this, "RoomEndpoint", {
      value: APIRoom.urlForPath("/room")
    });

    const booking_service = createBookingLambda(this, 'booking_service', 'index.main', {
      "region": this.region
    });
    
    const room_service = createRoomLambda(this, 'room_service', 'index.main', {
      "region": this.region
    });

    const booking_table = createTable(this, 'bookingTable', 'bookingId');
    const room_table = createTable(this, 'roomTable', 'roomId');

    const bookingtResource = APIBooking.root.addResource("setting");
    const roomResource = APIRoom.root.addResource("setting");

    bookingtResource.addMethod(
      "POST",
      new apigw.LambdaIntegration(booking_service)
    );
    roomResource.addMethod(
      "POST",
      new apigw.LambdaIntegration(room_service)
    );
    
    booking_table.grantFullAccess(booking_service);
    room_table.grantFullAccess(room_service);
  }
}
