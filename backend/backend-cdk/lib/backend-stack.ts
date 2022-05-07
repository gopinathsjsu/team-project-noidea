import { Stack, StackProps, CfnOutput, Duration} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createBookingLambda, createRoomLambda, createAssociateLambda }  from './resource/lambda'
import { createRestAPI } from './resource/apigateway'
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import { createTable } from './resource/dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda';
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
    const amenity_table = createTable(this, 'amenity_table', 'amenityId')
    const room_table = createTable(this, 'room_table', 'roomId');
    const user_table = dynamodb.Table.fromTableArn(this, 'user_table', 'arn:aws:dynamodb:us-west-2:568187732893:table/User');
    const loyalty_table = dynamodb.Table.fromTableArn(this, 'loyalty_table', 'arn:aws:dynamodb:us-west-2:568187732893:table/HotelLoyalty');
    // Lambdas
    const booking_service = createBookingLambda(this, 'Hotel_booking', 'booking.reservation_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const get_reservation = createBookingLambda(this, 'Hotel_reservationInfo', 'booking.retrieve_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const confirm_reservation = createBookingLambda(this, 'Hotel_confrim_reservation', 'booking.confirm_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const cancel_reservation = createBookingLambda(this, 'Hotel_cancel_reservation', 'booking.cancel_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const checkIn_reservation = createBookingLambda(this, 'Hotel_checkIn_reservation', 'booking.checkIn_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const checkOut_reservation = createBookingLambda(this, 'Hotel_checkOut_reservation', 'booking.checkOut_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const room_service = createRoomLambda(this, 'Hotel_room', 'room.room_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const room_Info = createRoomLambda(this, 'Hotel_roomInfo', 'room.roomInfo_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const room_type = createRoomLambda(this, 'Hotel_roomType', 'room.roomType_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const change_amenity = createRoomLambda(this, 'Hotel_change_amenity', 'room.amenity_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });
    const createamenity_handler = createRoomLambda(this, 'Hotel_create_amenity', 'room.createamenity_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const get_amenity = createRoomLambda(this, 'Hotel_get_amenity', 'room.amenityInfo_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    });

    const allrooms_handler = createRoomLambda(this, 'Hotel_get_allrooms', 'room.allrooms_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    })

    const allamenity_handler = createRoomLambda(this, 'Hotel_get_allamenity', 'room.allamenity_handler', {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    })

    const getallreservation_hanlder = createBookingLambda(this, "Hotel_get_allreservation", "booking.getallreservation_hanlder", {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    })
    const amenityTotalPrice = createAssociateLambda(this, "Hotel_amenityTotalPrice", "amenityTotalPrice.amenityTotalPrice", {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    })
    const getloatyPoint = createAssociateLambda(this, "Hotel_getloatyPoint", "loyaltyPoint.getloatyPoint", {
      "region": this.region,
      "room_table": room_table.tableName,
      "reservation_table" : reservation_table.tableName,
      "amenity_table" : amenity_table.tableName,
      "user_table" : user_table.tableName
    })

    
    // API Resource
    const bookingtResource = APIBooking.root.addResource("booking", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true,
          allowHeaders: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
          ],
          allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
    const createamentiyRes = APIRoom.root.addResource("buildamentity", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true,
          allowHeaders: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
          ],
          allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
    const getallreservation = APIBooking.root.addResource("allreservation", {
      defaultCorsPreflightOptions: {
          allowOrigins: ['*'],
          allowCredentials: true,
          allowHeaders: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
          ],
          allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
        allowCredentials: true,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
        allowCredentials: true,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
        allowCredentials: true,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
        allowCredentials: true,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
        allowCredentials: true,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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

    const roomResource = APIRoom.root.addResource("room", {
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowCredentials: true,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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

  const roomInfo = APIRoom.root.addResource("roomInfo", {
    defaultCorsPreflightOptions: {
      allowOrigins: ['*'],
      allowCredentials: true,
      allowHeaders: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
      ],
      allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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

const allroomInfo = APIRoom.root.addResource("allroomInfo", {
  defaultCorsPreflightOptions: {
    allowOrigins: ['*'],
    allowCredentials: true,
    allowHeaders: [
      'Content-Type',
      'X-Amz-Date',
      'Authorization',
      'X-Api-Key',
    ],
    allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
  const roomType = APIRoom.root.addResource("roomtype", {
    defaultCorsPreflightOptions: {
      allowOrigins: ['*'],
      allowCredentials: true,
      allowHeaders: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
      ],
      allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
  const changeamenity = APIRoom.root.addResource("amenity", {
    defaultCorsPreflightOptions: {
      allowOrigins: ['*'],
      allowCredentials: true,
      allowHeaders: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
      ],
      allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
  const amenityInfo = APIRoom.root.addResource("amenityInfo", {
    defaultCorsPreflightOptions: {
      allowOrigins: ['*'],
      allowCredentials: true,
      allowHeaders: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
      ],
      allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
const allamenityInfo = APIRoom.root.addResource("allamenityInfo", {
  defaultCorsPreflightOptions: {
    allowOrigins: ['*'],
    allowCredentials: true,
    allowHeaders: [
      'Content-Type',
      'X-Amz-Date',
      'Authorization',
      'X-Api-Key',
    ],
    allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
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
    createamentiyRes.addMethod(
      "POST",
      new apigw.LambdaIntegration(createamenity_handler, {proxy: false, 
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
    )
    getallreservation.addMethod(
      "GET",
      new apigw.LambdaIntegration(getallreservation_hanlder, {proxy: true})
    )
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
      new apigw.LambdaIntegration(room_service, {proxy: false, 
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
    roomInfo.addMethod(
      "GET",
      new apigw.LambdaIntegration(room_Info, {proxy: true})
    );

    roomType.addMethod(
      "PATCH",
      new apigw.LambdaIntegration(room_type, {proxy: false, 
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
    changeamenity.addMethod(
      "PATCH",
      new apigw.LambdaIntegration(change_amenity, {proxy: false, 
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
    amenityInfo.addMethod(
      "GET",
      new apigw.LambdaIntegration(get_amenity, {proxy: true})
    );
    allamenityInfo.addMethod(
      "GET",
      new apigw.LambdaIntegration(allamenity_handler, {proxy: true})
    )
    allroomInfo.addMethod(
      "GET",
      new apigw.LambdaIntegration(allrooms_handler, {proxy: true})
    )
    // Access Permission
    user_table.grantFullAccess(booking_service);
    amenity_table.grantFullAccess(booking_service);
    amenity_table.grantFullAccess(room_service);
    amenity_table.grantFullAccess(change_amenity);
    amenity_table.grantFullAccess(get_amenity);
    amenity_table.grantFullAccess(allamenity_handler);
    amenity_table.grantFullAccess(createamenity_handler);
    amenity_table.grantFullAccess(amenityTotalPrice);
    reservation_table.grantFullAccess(booking_service);
    reservation_table.grantFullAccess(get_reservation);
    reservation_table.grantFullAccess(confirm_reservation);
    reservation_table.grantFullAccess(cancel_reservation);
    reservation_table.grantFullAccess(checkIn_reservation);
    reservation_table.grantFullAccess(checkOut_reservation);
    reservation_table.grantFullAccess(getallreservation_hanlder);
    room_table.grantFullAccess(booking_service);
    room_table.grantFullAccess(room_service);
    room_table.grantFullAccess(room_Info);
    room_table.grantFullAccess(room_type);
    room_table.grantFullAccess(allrooms_handler);
    loyalty_table.grantFullAccess(getloatyPoint);
    loyalty_table.grantFullAccess(booking_service);
  }
}
