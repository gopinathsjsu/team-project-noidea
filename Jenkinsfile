@Library('github.com/releaseworks/jenkinslib') _

pipeline {

    // Where to execute the pipeline script
    agent any

    environment{
        AWS_DEFAULT_REGION="us-west-2"
        AWS_CREDENTIALS=credentials('AWS-hootel-dev')
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
                    zip archive: true, dir: "backend/UserService/Login", overwrite: true, zipFile: "UserService-Login.zip"
                    zip archive: true, dir: "backend/UserService/Register", overwrite: true, zipFile: "UserService-Register.zip"
                    zip archive: true, dir: "backend/UserService/VerifyUser", overwrite: true, zipFile: "UserService-Verify.zip"

                    echo "LoyaltyService"
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
                        string(credentialsId: 'hootel-dev-bucket', variable: 'BUCKET'), 
                        string(credentialsId: 'hootel-dev-lambda', variable: 'LAMBDA'),
                        [
                            $class: 'AmazonWebServicesCredentialsBinding',
                            credentialsId: "AWS-hootel-dev",
                            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                        ]
                    ]
                    ) {
                        echo "Deploying ${BRANCH_NAME} onto $LAMBDA"
                        AWS("s3 cp UserService-Login.zip s3://$BUCKET")
                        AWS("lambda update-function-code --function-name $LAMBDA --s3-bucket $BUCKET --s3-key UserService-Login.zip")
                    }
                }
            }
        }
        // stage("prod-deploy") {
        //     steps {
        //         script {
                    
        //             withCredentials([
        //                 string(credentialsId: 'hootel-prod-bucket', variable: 'BUCKET'), 
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
        //                 AWS("s3 cp UserService-Login.zip s3://$BUCKET")
        //                 AWS("lambda update-function-code --function-name $LAMBDA --s3-bucket $BUCKET --s3-key UserService-Login.zip")
        //         }
        //     }
        // }
    }
}