console.log("Removing a cognito client")
const { getCognitoUsers } = require('./list')
const { deleteListCognitoUsers } = require('./delete')
const { 
    CognitoIdentityProviderClient
} = require("@aws-sdk/client-cognito-identity-provider");

const dotenv = require('dotenv');
dotenv.config();

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_COGNITO_REGION });

async function main(){
    //lets get all the users in cognito
    const users = await getCognitoUsers(client);
    console.log("removing users:", users.length)
    //then we delete all of them
    await deleteListCognitoUsers(users, client)
}

main();
