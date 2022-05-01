import APIUtil from "./apiUtil";
import { v4 as uuidv4 } from "uuid";
import { Auth } from "aws-amplify";

const BASE_URL = "https://2pai97g6d5.execute-api.us-west-2.amazonaws.com";

export default class HotelServiceUtil {
  static async registerHotel(payload) {
    return APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/hotel-register`, BASE_URL);
      const cogUserId = await Auth.currentSession();

      const reqOpts = await APIUtil.buildRequestOptions("POST", {
        hotel: {
          userId: cogUserId?.idToken?.payload["cognito:username"],
          hotelId: uuidv4(),
          name: payload.hotelName,
          address: payload.address,
          country: "USA",
          email: payload.email
        }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }

  static async getHotels() {
    return APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/hotel-get?hotelId=-1`, BASE_URL);

      const reqOpts = await APIUtil.buildRequestOptions("GET");

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }

  static async getBranches(hotelId) {
    return APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/branch-get?hotelId=${hotelId}&branchId=-1`, BASE_URL);

      const reqOpts = await APIUtil.buildRequestOptions("GET");

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }

  static async registerBranch(payload) {
    return APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/branch-create`, BASE_URL);
      const cogUserId = await Auth.currentSession();

      const reqOpts = await APIUtil.buildRequestOptions("POST", {
        hotel: {
          branchId: uuidv4(),
          hotelId: payload.hotelId,
          userId: cogUserId?.idToken?.payload["cognito:username"],
          address: payload.address,
          country: "USA",
          email: payload.email,
          name: payload.name
        }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
}
