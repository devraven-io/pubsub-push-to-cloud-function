# pubsub-push-to-cloud-function

Connects Pub/Sub emulator to locally running Cloud function. This utility helps POST the payloads from topics to Cloud Functions.

While Pub/Sub emulator does have the ability to push messages to the target end point. An utility like this is especially helpful if you need flow control to limit the number of parallel executions of your Cloud Function. 

## Setup

0. Clone this repository and run `npm install` to install the dependencies.

1. Refer https://cloud.google.com/pubsub/docs/emulator for instructions on setting up local pubsub emulator.

2. Execute `$(gcloud beta emulators pubsub env-init)` to setup environment variables. Or Execute `export PUBSUB_EMULATOR_HOST=localhost:8432` to manually set the variables.

3. Set the following two environment variables to the console before starting the utility.

```
export CLOUD_FUNCTION_URL = http://localhost:8086 //change this to the location where your cloud function is running
export TOPIC_SUBSCRIPTION = "local_topic_sub"; //change this to your local topic's subscription name

```

4. Run `node index.js` to start the utility.

5. The utility subscribes to the topic and any messages received are POST'ed to the configured Cloud Function url.
