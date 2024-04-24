const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const shop_order = `Order #00001 was created or updated on your online shop. Tap https://oneearthsacredarts.com/wp-admin/edit.php?post_type=shop_order view the order.`;

app.get('/', (req, res) => {
  sendSMSToMyself(shop_order);
  res.send('Ahoy, ye scurvy dogs!!!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.info(`Keep ${process.env.SUPER_SECRET_KEY} a secret!`);
});

function sendSMSToMyself(msg) {
  client.messages
    .create({
      body: msg,
      contentSid: 'HX0aa17e5d2ad6bf9ab1e3944d2e3e9b49',
      // contentVariables: JSON.stringify({ 1: '99999' }),
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${process.env.CHARLIES_PHONE_NUMBER}`
    })
    .then(message => {console.log(message.sid); console.log(message.error_code); console.log(message.error_message);console.log(message.status); console.log(message.uri);})
    .catch(err => console.error(err));
}
