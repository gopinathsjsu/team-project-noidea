import { App }from "aws-cdk-lib";
import { BackEndCdkStack } from './backend-stack'

const app = new App();

new BackEndCdkStack(app, '202-dev', {
    stackName: '202-dev',
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
  
