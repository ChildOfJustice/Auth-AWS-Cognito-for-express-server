# Authorization with AWS Cognito for nodeJS express server

# How to setup:
Install all dependencies.
```bash
$ npm install
``` 

# Create AWS Cognito UserPool service:
Login to your aws account and open the Cognito service, follow the steps below:
1. Enter a Pool name of your choice & click `Step through settings`
2. Under `Which standard attributes do you want to require?` make sure **birthdate**, **email**, **family_name** & **name** are all checked & click `Next Step`
3. Keep clicking `Next Step` until you reach the App clients and click `Add a new app client`
4. Give whatever client name you want and make sure ***Enable username password based authentication (ALLOW_USER_PASSWORD_AUTH)*** is checked and click `Create app client`
5. Keep clicking `Next Step` and finally click `Create pool`
