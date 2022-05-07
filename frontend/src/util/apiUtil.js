import { Auth } from "aws-amplify";

export default class APIUtil {
  static async buildRequestOptions(method, body, addHeaders) {
    const cogUserId = await Auth.currentSession();
    return {
      method,
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken,
        ...addHeaders
      },
      body: JSON.stringify(body)
    };
  }

  static async buildRequestOptionsNoJSON(method, body, addHeaders) {
    const cogUserId = await Auth.currentSession();
    return {
      method,
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken,
        ...addHeaders
      },
      body: JSON.stringify(body)
    };
  }

  static async apiUtilDecorator(method, onError, onFinally) {
    try {
      const methodResp = await method();
      return methodResp;
    } catch (error) {
      onError && onError(error);
      return { error };
    } finally {
      onFinally && onFinally();
    }
  }
}
