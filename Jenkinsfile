@Library('github.com/releaseworks/jenkinslib') _

pipeline {

    // Where to execute the pipeline script
    agent any

    environment{
        AWS_DEFAULT_REGION="us-west-2"
        AWS_CREDENTIALS=credentials('AWS-hootel-dev')
        ZIP_USER_LOGIN="UserService-Login.zip"
        ZIP_USER_REGISTER="UserService-Register.zip"
        ZIP_USER_VERIFY="UserService-Verify.zip"
        ZIP_USER_GETROLE="UserService-GetRole.zip"
        ZIP_LOYALTY_CHECK="LoyaltyService-CheckAmount.zip"
        ZIP_LOYALTY_REDEEM="LoyaltyService-Redeem.zip"
        ZIP_LOYALTY_ADD="LoyaltyService-AddAmount.zip"
    }

    // Different pipeline stages
    stages {
        stage("init") {
            steps {
                script {
                    echo "Initializing Pipeline"
                    echo "Installing Node Packages"
                }
            }
        }

        // Zips up the folders
        stage("build") {
            steps {
                script {
                    echo "Building ${BRANCH_NAME}"

                    echo "UserService"
                    zip archive: true, dir: "backend/UserService/Login", overwrite: true, zipFile: "${env.ZIP_USER_LOGIN}"
                    zip archive: true, dir: "backend/UserService/GetRole", overwrite: true, zipFile: "${env.ZIP_USER_GETROLE}"
                    zip archive: true, dir: "backend/UserService/Register", overwrite: true, zipFile: "${env.ZIP_USER_REGISTER}"
                    // zip archive: true, dir: "backend/UserService/VerifyUser", overwrite: true, zipFile: "${env.ZIP_USER_VERIFY}"

                    echo "LoyaltyService"
                    zip archive: true, dir: "backend/LoyaltyService/CheckAmount", overwrite: true, zipFile: "${env.ZIP_LOYALTY_CHECK}"
                    zip archive: true, dir: "backend/LoyaltyService/RedeemReward", overwrite: true, zipFile: "${env.ZIP_LOYALTY_REDEEM}"
                    zip archive: true, dir: "backend/LoyaltyService/AddRewards", overwrite: true, zipFile: "${env.ZIP_LOYALTY_ADD}"
                    echo "SearchService"
                    echo "Misc"
                }
            }
        }

        // Uploads zipped folders to Lambda directly if under 10MB
        stage("dev-deploy") {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'hootel-cicd-bucket', variable: 'BUCKET'), 
                        string(credentialsId: 'hootel-dev-lambda-UserLogin', variable: 'LAMBDA'),
                        string(credentialsId: 'hootel-dev-lambda-UserGetRole', variable: 'LAMBDA2'),
                        string(credentialsId: 'hootel-dev-lambda-UserRegister', variable: 'LAMBDA3'),
                        string(credentialsId: 'hootel-dev-lambda-LoyaltyCheck', variable: 'LOYALTY_CHECK'),
                        string(credentialsId: 'hootel-dev-lambda-LoyaltyRedeem', variable: 'LOYALTY_REDEEM'),
                        string(credentialsId: 'hootel-dev-lambda-LoyaltyAdd', variable: 'LOYALTY_ADD'),
                        [
                            $class: 'AmazonWebServicesCredentialsBinding',
                            credentialsId: "AWS-hootel-dev",
                            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                        ]
                    ]
                    ) {
                        echo "Deploying ${BRANCH_NAME} onto ${LAMBDA}"
                        AWS("s3 cp ${env.ZIP_USER_LOGIN} s3://${BUCKET}")
                        AWS("s3 cp ${env.ZIP_USER_GETROLE} s3://${BUCKET}")
                        AWS("s3 cp ${env.ZIP_USER_REGISTER} s3://${BUCKET}")
                        AWS("s3 cp ${env.ZIP_LOYALTY_CHECK} s3://${BUCKET}")
                        AWS("s3 cp ${env.ZIP_LOYALTY_REDEEM} s3://${BUCKET}")
                        AWS("s3 cp ${env.ZIP_LOYALTY_ADD} s3://${BUCKET}")
                        AWS("lambda update-function-code --function-name ${LAMBDA} --s3-bucket ${BUCKET} --s3-key ${env.ZIP_USER_LOGIN} --region ${AWS_DEFAULT_REGION}")
                        AWS("lambda update-function-code --function-name ${LAMBDA2} --s3-bucket ${BUCKET} --s3-key ${env.ZIP_USER_GETROLE} --region ${AWS_DEFAULT_REGION}")
                        AWS("lambda update-function-code --function-name ${LAMBDA3} --s3-bucket ${BUCKET} --s3-key ${env.ZIP_USER_REGISTER} --region ${AWS_DEFAULT_REGION}")
                        AWS("lambda update-function-code --function-name ${LOYALTY_CHECK} --s3-bucket ${BUCKET} --s3-key ${env.ZIP_LOYALTY_CHECK} --region ${AWS_DEFAULT_REGION}")
                        AWS("lambda update-function-code --function-name ${LOYALTY_REDEEM} --s3-bucket ${BUCKET} --s3-key ${env.ZIP_LOYALTY_REDEEM} --region ${AWS_DEFAULT_REGION}")
                        AWS("lambda update-function-code --function-name ${LOYALTY_ADD} --s3-bucket ${BUCKET} --s3-key ${env.ZIP_LOYALTY_ADD} --region ${AWS_DEFAULT_REGION}")
                    }
                }
            }
        }
        // stage("prod-deploy") {
        //     steps {
        //         script {
                    
        //             withCredentials([
        //                 string(credentialsId: 'hootel-cicd-bucket', variable: 'BUCKET'), 
        //                 string(credentialsId: 'hootel-prod-lambda-create', variable: 'LAMBDA'),
        //                 [
        //                     $class: 'AmazonWebServicesCredentialsBinding',
        //                     credentialsId: "AWS-hootel-prod",
        //                     accessKeyVariable: 'AWS_ACCESS_KEY_ID',
        //                     secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        //                 ]
        //             ]
        //             ) {
        //                 echo "Deploying ${BRANCH_NAME} onto $LAMBDA"
        //                 AWS("s3 cp ${ZIP_LOGINSERVICE} s3://$BUCKET")
        //                 AWS("lambda update-function-code --function-name $LAMBDA --s3-bucket $BUCKET --s3-key ${ZIP_LOGINSERVICE}")
        //         }
        //     }
        // }
    }
}