import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_6vWs79LvT",
  ClientId: "2sus546va29goj8lv5bamqvrmr"
}

export default new CognitoUserPool(poolData);