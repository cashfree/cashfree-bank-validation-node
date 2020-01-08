const cfSdk = require('cashfree-sdk');

const {Payouts} = cfSdk;
const {Validation} = Payouts;

const config = {
    Payouts: {
        "ClientID": "CF6130FKDN0O61WFQMYUM",
        "ClientSecret": "d1141e574b7e3b1caf032ee7af3e4dbea3a61681",
        "ENV": "TEST",
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
