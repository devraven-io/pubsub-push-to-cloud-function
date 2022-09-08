/*
* author - KC/DevRaven.io
*/

const { PubSub } = require('@google-cloud/pubsub');
const axios = require('axios').default;
const getCloudFunctionPayload = require('./envelope');

const CLOUD_FUNCTION_URL = "http://localhost:8086"
const SUBSCRIPTION_NAME = "ssl_monitor_dev_sub";

if(!process.env.PUBSUB_EMULATOR_HOST) {
    console.error("ERROR: PUBSUB_EMULATOR_HOST is not set!");
    console.error("ERROR: Ensure that PUBSUB emulator is running and set PUBSUB_EMULATOR_HOST. e.g. export PUBSUB_EMULATOR_HOST=localhost:8884");
    process.exit(1);
}
const pubsub = new PubSub();  

async function postToCloudFunction(payload) {   
    await axios.post(CLOUD_FUNCTION_URL, payload)
      .then(function (response) {
        console.log("Post successful. status="+response.status);
      })
      .catch(function (error) {
        console.log(error);        
      });
}

// References an existing subscription
const subscription = pubsub.subscription(SUBSCRIPTION_NAME);

// Create an event handler to handle messages
const messageHandler = message => {
  console.log(`Received data: ${message.data}`);

  const data = message.data;
  const payload = getCloudFunctionPayload(data);
  postToCloudFunction(payload);   
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on('message', messageHandler);