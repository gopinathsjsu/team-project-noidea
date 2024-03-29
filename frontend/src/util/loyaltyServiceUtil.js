import { Auth } from "aws-amplify";
import APIUtil from "./apiUtil";

const BASE_URL = "https://dmtt6rt1c9.execute-api.us-west-2.amazonaws.com/";

export default class LoyaltyServiceUtil {
  static async createLoyaltyAccount() {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/loyalty-create`, BASE_URL);
      const cogUserId = await Auth.currentSession();

      const reqOpts = await APIUtil.buildRequestOptions("POST", {
        userId: cogUserId?.idToken?.payload["cognito:username"]
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async getLoyaltyAccountId(userId) {
    return APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/loyalty-get?userId=${userId}`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("GET");

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
  static async addPoints(loyaltyId, amount) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/loyalty-points-add`, "https://dmtt6rt1c9.execute-api.us-west-2.amazonaws.com/dev");

      const reqOpts = await APIUtil.buildRequestOptions("POST", {
        loyalty: { loyaltyId, amount }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
}
