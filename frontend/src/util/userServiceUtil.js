import APIUtil from "./apiUtil";

const BASE_URL = "https://2va96t2eh7.execute-api.us-west-2.amazonaws.com";

export default class UserServiceUtil {
  static async getUserInfo(userId) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/user-login?userId=${userId}`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("GET");

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      if (data?.message === "Invalid userId, user does not exist") {
        return { error: { errorMessage: "Invalid userId, user does not exist" } };
      }
      return data;
    });
  }

  static async registerUserInfo(userId, userPayload) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/user-register`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("POST", {
        user: {
          userId,
          name: userPayload.name,
          email: userPayload.email,
          address: userPayload.address,
          country: userPayload.country,
          roles: userPayload.roles
        },
        card: {
          number: userPayload.cardNumber,
          cvv: userPayload.cardCVV,
          expDate: userPayload.cardExpDate
        }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }

  static async updateUserInfo(userId, userPayload) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/user-update`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("POST", {
        user: {
          userId,
          name: userPayload.name,
          email: userPayload.email,
          address: userPayload.address,
          country: userPayload.country,
          roles: userPayload.roles
        }
      });

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }

  static async getUserInfoByRole(userId, userRole) {
    return await APIUtil.apiUtilDecorator(async () => {
      const url = new URL(`/dev/get-role?userId=${userId}&role=${userRole}`, BASE_URL);
      const reqOpts = await APIUtil.buildRequestOptions("GET");

      const response = await fetch(url, reqOpts);
      const data = await response.json();

      return data;
    });
  }
}
