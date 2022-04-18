import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createBookingLambda, createRoomLambda }  from './resource/lambda'
import { createRestAPI } from './resource/apigateway'
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
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

    // DynamoDB Table
    const reservation_table = createTable(this, 'reservation_table', 'reservationId');
    const amentity_table = createTable(this, 'amentity_table', 'amentityId')
    const room_table = createTable(this, 'room_table', 'roomId');
    const user_table = dynamodb.Table.fromTableArn(this, 'user_table', 'arn:aws:dynamodb:us-west-2:568187732893:table/User');
    
    const booking_service = createBookingLambda(this, 'booking', 'booking.reservation_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amentity_table" : amentity_table.tableName,
      "user_table" : user_table.tableName
    });
    
    const room_service = createRoomLambda(this, 'roomService', 'roomService.lambda_handler', {
      "region": this.region
    });

    const bookingtResource = APIBooking.root.addResource("booking", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true
      },
      defaultMethodOptions: {
        methodResponses: [{
            statusCode: "200"
        }]
      }
    });
    bookingtResource.addMethod('ANY');

    const roomResource = APIRoom.root.addResource("setting", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true
      }
  });

    bookingtResource.addMethod(
      "POST",
      new apigw.LambdaIntegration(booking_service)
    );
    roomResource.addMethod(
      "POST",
      new apigw.LambdaIntegration(room_service)
    );

    user_table.grantFullAccess(booking_service)
    amentity_table.grantFullAccess(booking_service);
    reservation_table.grantFullAccess(booking_service);
    room_table.grantFullAccess(booking_service);

  }
}
