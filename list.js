const { 
    ListUsersCommand
} = require("@aws-sdk/client-cognito-identity-provider");

module.exports.getCognitoUsers = (client) => {
    //We build the adminListOfUserCommand with the userPoolId name and all the attributes that should be retrieved
    //These attributes allow to identify a single user to erase
    const adminListOfUserCommandInput = {
        UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
        AttributesToGet: [
            "email"
          ],
          //We set the limit to 60 because you only can retrieve 60 users per request
          Limit: 60,
        //   PaginationToken:""
    };
    return new Promise(async (resolve, reject) =>{
        let users = [];
        let paginationToken = "";
        do{
             //while we have more users to get, we repeat the ListUsers command
            //so we get the first set of rows
            const listOfUsers = await client.send(new ListUsersCommand(adminListOfUserCommandInput));
            //and we look for PaginationToken. If it is set we have more users to get
            paginationToken = listOfUsers.PaginationToken;
            //so we modify the original adminListOfUserCommand adding the PaginationToken with the value of the paginationToken
            adminListOfUserCommandInput.PaginationToken = paginationToken;
            //of course we save the users obtained
            users = users.concat(listOfUsers.Users)
            //we keep doing this until no more users are available
        }while(paginationToken)
        resolve(users);
    })
}