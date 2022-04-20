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
    
    // Lambdas
    const booking_service = createBookingLambda(this, 'Hotel_booking', 'booking.reservation_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amentity_table" : amentity_table.tableName,
      "user_table" : user_table.tableName
    });

    const get_reservation = createBookingLambda(this, 'Hotel_reservationInfo', 'booking.retrieve_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amentity_table" : amentity_table.tableName,
      "user_table" : user_table.tableName
    });

    const confirm_reservation = createBookingLambda(this, 'Hotel_confrim_reservation', 'booking.confirm_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amentity_table" : amentity_table.tableName,
      "user_table" : user_table.tableName
    });

    const cancel_reservation = createBookingLambda(this, 'Hotel_cancel_reservation', 'booking.cancel_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amentity_table" : amentity_table.tableName,
      "user_table" : user_table.tableName
    });

    const checkIn_reservation = createBookingLambda(this, 'Hotel_checkIn_reservation', 'booking.checkIn_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amentity_table" : amentity_table.tableName,
      "user_table" : user_table.tableName
    });

    const checkOut_reservation = createBookingLambda(this, 'Hotel_checkOut_reservation', 'booking.checkOut_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amentity_table" : amentity_table.tableName,
      "user_table" : user_table.tableName
    });

    const room_service = createRoomLambda(this, 'roomService', 'roomService.lambda_handler', {
      "region": this.region
    });

    // API Resource
    const bookingtResource = APIBooking.root.addResource("booking", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true
      },
      defaultMethodOptions: {
        methodResponses: [{
            statusCode: "200",
            responseParameters: {
              'method.response.header.Content-Type': true 
            }
        }]
      }
    });

    const retrieveReservation = APIBooking.root.addResource("reservationInfo", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true
      },
      defaultMethodOptions: {
        methodResponses: [{
            statusCode: "200",
            responseParameters: {
              'method.response.header.Content-Type': true 
            }
        }]
      }
    });
    const confirmReservation = APIBooking.root.addResource("confirm", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true
      },
      defaultMethodOptions: {
        methodResponses: [{
            statusCode: "200",
            responseParameters: {
              'method.response.header.Content-Type': true 
            }
        }]
      }
    });
    const cancelReservation = APIBooking.root.addResource("cancel", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true
      },
      defaultMethodOptions: {
        methodResponses: [{
            statusCode: "200",
            responseParameters: {
              'method.response.header.Content-Type': true 
            }
        }]
      }
    });

    const checkInReservation = APIBooking.root.addResource("checkin", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true
      },
      defaultMethodOptions: {
        methodResponses: [{
            statusCode: "200",
            responseParameters: {
              'method.response.header.Content-Type': true 
            }
        }]
      }
    });

    const checkOutReservation = APIBooking.root.addResource("checkout", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true
      },
      defaultMethodOptions: {
        methodResponses: [{
            statusCode: "200",
            responseParameters: {
              'method.response.header.Content-Type': true 
            }
        }]
      }
    });
    bookingtResource.addMethod('ANY');
    retrieveReservation.addMethod('ANY');
    confirmReservation.addMethod('ANY');
    cancelReservation.addMethod('ANY');
    checkInReservation.addMethod('ANY');
    checkOutReservation.addMethod('ANY');

    const roomResource = APIRoom.root.addResource("setting", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true
      }
  });

  // API Method
    bookingtResource.addMethod(
      "POST",
      new apigw.LambdaIntegration(booking_service, {proxy: false, 
        integrationResponses: [
        {statusCode: "200"}
        ]}),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Origin": true
            }
          }
        ]
      }
    );
    retrieveReservation.addMethod(
      "GET",
      new apigw.LambdaIntegration(get_reservation, {proxy: true})
    )
    confirmReservation.addMethod(
      "PATCH",
      new apigw.LambdaIntegration(confirm_reservation, {proxy: false, 
        integrationResponses: [
        {statusCode: "200"}
        ]}),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Origin": true
            }
          }
        ]
      }
    );
    cancelReservation.addMethod(
      "PATCH",
      new apigw.LambdaIntegration(cancel_reservation, {proxy: false, 
        integrationResponses: [
        {statusCode: "200"}
        ]}),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Origin": true
            }
          }
        ]
      }
    );
    checkInReservation.addMethod(
      "PATCH",
      new apigw.LambdaIntegration(checkIn_reservation, {proxy: false, 
        integrationResponses: [
        {statusCode: "200"}
        ]}),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Origin": true
            }
          }
        ]
      }
    );
    checkOutReservation.addMethod(
      "PATCH",
      new apigw.LambdaIntegration(checkOut_reservation, {proxy: false, 
        integrationResponses: [
        {statusCode: "200"}
        ]}),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Origin": true
            }
          }
        ]
      }
    );
    roomResource.addMethod(
      "POST",
      new apigw.LambdaIntegration(room_service)
    );

    // Access Permission
    user_table.grantFullAccess(booking_service)
    amentity_table.grantFullAccess(booking_service);
    reservation_table.grantFullAccess(booking_service);
    reservation_table.grantFullAccess(get_reservation);
    reservation_table.grantFullAccess(confirm_reservation);
    reservation_table.grantFullAccess(cancel_reservation);
    reservation_table.grantFullAccess(checkIn_reservation);
    reservation_table.grantFullAccess(checkOut_reservation);
    room_table.grantFullAccess(booking_service);

  }
}
