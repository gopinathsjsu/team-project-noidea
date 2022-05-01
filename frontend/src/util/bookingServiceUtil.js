import APIUtil from "./apiUtil";

const BASE_URL = "https://nua5fhfin1.execute-api.us-west-2.amazonaws.com";

export default class BookingServiceUtil {
  static async getAmenitites() {
    const url = new URL(`/prod/allamenityInfo`, BASE_URL);
    const reqOpts = await APIUtil.buildRequestOptions("GET");

    const response = await fetch(url, reqOpts);
    const data = await response.json();

    return data;
  }
  static async updateAmenity(amenityPayload) {
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
  }
  static async updateExistingAmenity(amenityId, amenityPayload) {
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
  }
  static async getRooms() {
    const url = new URL(`/prod/allroomInfo`, BASE_URL);
    const reqOpts = await APIUtil.buildRequestOptions("GET");

    const response = await fetch(url, reqOpts);
    const data = await response.json();

    return data;
  }
}
