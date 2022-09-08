const CryptoJS = require('crypto-js');

const getCloudFunctionPayload = (message) => {
    var wordArray = CryptoJS.enc.Utf8.parse(message);
    const base64Encoded = CryptoJS.enc.Base64.stringify(wordArray);

    const envelope = {
        "context": {
          "eventId": Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
          "timestamp":(new Date()).toISOString(),
          "eventType":"google.pubsub.topic.publish",
          "resource":{
            "service":"pubsub.googleapis.com",
            "name":"projects/sample-project/topics/gcf-test",
            "type":"type.googleapis.com/google.pubsub.v1.PubsubMessage"
          }
        },
        "data": {
          "@type": "type.googleapis.com/google.pubsub.v1.PubsubMessage",
          "attributes": {
             "attr1":"attr1-value"
          },
          "data": base64Encoded
        }
      };
    return envelope;
}

module.exports = getCloudFunctionPayload;