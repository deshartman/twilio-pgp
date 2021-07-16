const express = require('express')
const basicAuth = require('express-basic-auth')
const app = express()
const port = 3000

// Connector uses Basic Auth. Make sure username and password is set to 'foo' and 'bar' in Twilio
app.use(basicAuth({
    users: { 'foo': 'bar' },
    challenge: false,
}));

// Ensure the application/json is set, since the connector does not explicitly set it
function setContentType(req, res, next) {
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    next();
}
app.use(setContentType);

// for parsing application/json
app.use(express.json())

//////////////////////// ROUTES ///////////////////////////////

// Default path
app.get('/', (req, res) => {
    res.send('Custom Payment Gateway Proxy')
})

// Connector sends payment requests to the '/charge' path
app.post('/charge', (req, res) => {
    console.log(`Got request`);
    // Log out the received JSON object. NB! This is PCI sensitive, so only for test
    console.log(req.body)

    // Respond with a dummy card transactions and no errors
    let payment = {
        "charge_id": "ch_a9dc6297cd1a4fb095e61b1a9cf2dd1d",
        "error_code": null,
        "error_message": null
    };

    console.log(`Responding with: ${JSON.stringify(payment, null, 4)}`);
    res.send(payment);
})

// Connector sends token requests to the '/tokenize' path
app.post('/tokenize', (req, res) => {
    console.log(`Got request`);
    // Log out the received JSON object. NB! This is PCI sensitive, so only for test
    console.log(req.body)

    // Respond with a dummy token transactions and no errors
    let token = {
        "token_id": "tk_a9dc6297cd1a4fb095e61b1a9cf2dd1d",
        "error_code": null,
        "error_message": null
    };

    console.log(`Responding with: ${JSON.stringify(token, null, 4)}`);
    res.send(token);
})

// Responds to 'statuscallback' in <Pay> setting
app.post('/statuscallback', (req, res) => {
    console.log('statuscallback POST');
    console.log(req);
    res.send('Status callback received');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})