# cashfree-bank-validation-node

Below is an integration flow on how to use Cashfree's bank validation.
Please go through the payout docs here: https://docs.cashfree.com/docs/payout/guide/

The following script contains the following functionalities :
    -1.getToken() -> to get auth token to be used in all following calls.
    -2.verifyBankAccount() -> to verify bank account.


All the data used by the script can be found in the config.json file. This includes the clientId, clientSecret, bankDetails object.
You can change keep changing the values in the config file and running the script.
Please enter your clientId and clientSecret, along with the appropriate enviornment and bank details

## Prerequisites

1. Active cashfree payout account
2. Node.js


## Running the kit

1. Clone the code
2. run npm init to install all dependencies
3. enter the correct values into the config.json file
4. for execution: node app.js

