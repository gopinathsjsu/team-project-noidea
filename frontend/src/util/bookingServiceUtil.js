import APIUtil from "./apiUtil";

const BASE_URL = "https://5mbz63m677.execute-api.us-west-2.amazonaws.com/";

export default class BookingServiceUtil {
  static async getAmenitites() {
    const url = new URL(`/prod/allamenityInfo`, BASE_URL);
    const reqOpts = await APIUtil.buildRequestOptions("GET");

    const response = await fetch(url, reqOpts);
    const data = await response.json();

    return data;
  }
}
