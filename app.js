/*
Below is an integration flow on how to use Cashfree's sdk for bank validation.
Please go through the payout docs here: https://dev.cashfree.com/payouts
The following script contains the following functionalities :
    2.Validation.verifyBankAccount() -> to verify bank account.

To use the script please enter your enviornment and corresponding client id and client secret
*/

const cfSdk = require('cashfree-sdk');

const {Payouts} = cfSdk;
const {Validation} = Payouts;

const config = {
    Payouts: {
        ClientID: "client_id",
        ClientSecret: "client_secret",
        ENV: "TEST",
    }
};

(async () => {
    //init
    Payouts.Init(config.Payouts);
    //bank validation
    try{
        const response = await Validation.ValidateBankDetails({
            name: "sameera",
            phone: "9000000000",
            bankAccount: "026291800001191",
            ifsc: "YESB0000262"
        });
        console.log("bank validation response");
        console.log(response);
    }
    catch(err){
        console.log("err caught in bank validation");
        console.log(err);
    }
})();
