const { 
    AdminDeleteUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

async function deleteCognitoUser(username, client){
    //we build the delete command for a single user to erase
    const adminDeleteUserCommandInput = {
        UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
        Username: username 
    };
    
    //------------- UNCOMMENT THIS LINE TO EXECUTE THE DELETE COMMAND, BE CAREFUL THIS CAN'T BE UNDONE!!-------------------
    // const adminDeleteUserCommandResults = await client.send(new AdminDeleteUserCommand(adminDeleteUserCommandInput));
    //---------------------------------------------------------------------------------------------------------------------

    console.log("adminDeleteUserCommandResults", adminDeleteUserCommandInput);
}

module.exports.deleteListCognitoUsers = async (array, client) => {
    //We just iterate the array and execute the delete command for each user
    for (const element of array) {
        await deleteCognitoUser(element.Username, client)
        //We add a small delay between request to avoid cognito limitations
        //we can't execute more than 20 requests per second
        await sleep(300);
        //console.log("deleted user:",element.Username)
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}