exports.handler = function (context, event, callback) {
    console.log("in Pay");

    let response = new Twilio.twiml.VoiceResponse();

    response.say('Calling Twilio Pay now');

    // Calling the Pay component
    const pay = response.pay({
        paymentConnector: 'GenericHTTP_Connector_2',
        chargeAmount: '50',
        postalCode: false,
        //securityCode: false,
        action: '/result',
    });

    callback(null, response);
};
