# twilio-pgp

## Installation

1. Clone this repo locally
2. Run `npm install` to install the dependencies
3. Run `twilio serverless:deploy` to deploy the two functions to your Twilio Functions environment
4. Start the local node server `node node-pgp/app.js`. Make sure it is on port 3000
5. Start the local Ngrok `ngrok http -subdomain=XXXXXX 3000`. Where XXXXX is your domain.
6. Note down the ngrok https address

## Twilio Setup

Configure your Twilio phone number to point to the above `pay` Function, by setting it up under voice for functions

Make sure you have the Generic HTTP Connector in your account and it is installed
Configure the Connector as follows:

1. Make sure the name is `GenericHTTP_Connector_2`
2. Username and password is `foo` and `bar` respectively
3. The endpoint URL is set to `https://XXXXX.ngrok.io`, to align with the ngrok name above

## Test

1. Call your Twilio number
2. You should hear a voice saying it iss in Pay and please enter your credit card
3. Use the following dummy data
   `Card: 4444 3333 2222 1111 Exp: 12 25 CVV: 333`

This should then be successful and display the entered detail in the node terminal window.
