/*
Below is an integration flow on how to use Cashfree's bank validation.
Please go through the payout docs here: https://docs.cashfree.com/docs/payout/guide/

The following script contains the following functionalities :
    1.getToken() -> to get auth token to be used in all following calls.
    2.verifyBankAccount() -> to verify bank account.


All the data used by the script can be found in the config.json file. This includes the clientId, clientSecret, bankDetails object.
You can change keep changing the values in the config file and running the script.
Please enter your clientId and clientSecret, along with the appropriate enviornment and bank details
*/

/**
 * Please note that this script has a dependency on the request library.
 */


const util = require('util');
const request = require("request");

const postAsync = util.promisify(request.post);
const getAsync = util.promisify(request.get);

const config = require('./config.json');

const {env, url, clientId, clientSecret} = config;
const baseUrl = config["baseUrl"][env];
const headers = {
    "X-Client-Id": clientId,
    "X-Client-Secret": clientSecret
}


//helper function to create the options that will be passed to the https/request library
function createOptions(action, headers, json){
    const finalUrl = baseUrl + url[action];
    json = json? json: {};
    return {url: finalUrl, headers, json};
}

function createHeader(token){
    return {...headers,'Authorization': 'Bearer ' + token};
}

//function to get auth token
//token is alive for 5 mins
async function getToken(){
    try{
        const r = await postAsync(createOptions('auth', headers));
        const {status, subCode, message} = r.body;
        if(status !== 'SUCCESS' || subCode !== '200') throw {name: "incorectResponseError", message: "incorrect response recieved: " + message};
        const {data: {token}} = r.body;
        return token;
    }
    catch(err){
        console.log("err in getting token");
        throw err;
    }
}

//function to verify bank account details
async function verifyBankAccount(token){
    try{
        let queryString = "?";
        Object.keys(config.bankDetails).forEach( key => {
            queryString = queryString + key + "=" + config.bankDetails[key] + "&";
        });
        const finalUrl = baseUrl + url['bankValidation'] + queryString.slice(0, -1);
        const r = await getAsync(finalUrl, {headers: createHeader(token)});
        console.log(JSON.parse(r.body));
    }
    catch(err){
        console.log("err in verifying bank account");
        throw err;
    }
}

/*
The flow executed below is:
1. fetching the auth token
2. verifying bank account
*/
(
    async () => {
        try{
            const token = await getToken();
            await verifyBankAccount(token);
        }
        catch(err){
            console.log("err caught in main loop");
            console.log(err);
        }
    }
)();