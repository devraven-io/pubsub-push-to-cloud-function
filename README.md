# pubsub-push-to-cloud-function

Connects pubsub emulator to locally running Cloud function. This utility helps POST the payloads from topics to Cloud Functions.

## Setup

1. Refer https://cloud.google.com/pubsub/docs/emulator for instructions on setting up local pubsub emulator.
2. Execute `$(gcloud beta emulators pubsub env-init)` to setup environment variables. Or Execute `export PUBSUB_EMULATOR_HOST=localhost:8432` to manually set the variables.
3. Modify the following two lines in index.js.

```
const CLOUD_FUNCTION_URL = "http://localhost:8086"; //change this to the location where your cloud function is running
const SUBSCRIPTION_NAME = "local_topic_sub"; //change this to your local topic's subscription name

```
4. Run `node index.js` to start the utility.
5. The utility subscribes to the topic and any messages received are POST'ed to the configured Cloud Function url.
