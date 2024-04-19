const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
    sendSMSToMyself("Ahoy, me scurvy mates!");
  res.send('Ahoy, me scurvy mates!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.info(`Keep ${process.env.SUPER_SECRET_KEY} a secret!`);
});

function sendSMSToMyself(msg) {
  client.messages
    .create({
      body: msg,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.MY_PHONE_NUMBER
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));
}
