import APIUtil from "./apiUtil";

const BASE_URL = "https://nua5fhfin1.execute-api.us-west-2.amazonaws.com";

export default class BookingServiceUtil {
  static async getAmenitites() {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/prod/allamenityInfo`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("GET");

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async updateAmenity(amenityPayload) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/prod/buildamentity`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("POST", {
        body: {
          amenityIfo: {
            ...amenityPayload
          }
        }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async updateExistingAmenity(amenityId, amenityPayload) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/prod/amenity`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("PATCH", {
        body: {
          amenityId,
          amenityInfo: {
            ...amenityPayload
          }
        }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async getRooms() {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/prod/allroomInfo`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("GET");

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async updateRoom(roomPayload) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/prod/room`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("POST", {
        body: {
          roomInfo: {
            ...roomPayload
          }
        }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async updateExistingRoom(roomId, roomPayload) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/prod/roomtype`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("PATCH", {
        body: {
          roomId,
          ...roomPayload
        }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async bookRoom(body) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/prod/booking`, "https://5mbz63m677.execute-api.us-west-2.amazonaws.com/prod");
      const reqOpts = await APIUtil.buildRequestOptions("POST", {
        body
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async allReservations() {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/prod/allreservation`, "https://5mbz63m677.execute-api.us-west-2.amazonaws.com/prod");
      const reqOpts = await APIUtil.buildRequestOptions("GET");

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async cancelReservation(reservationId) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/prod/cancel`, "https://5mbz63m677.execute-api.us-west-2.amazonaws.com");
      const reqOpts = await APIUtil.buildRequestOptions("PATCH", {
        body: {
          reservationId
        }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
}
