class BasePublisher {
  client;
  event;
  constructor(client) {
    this.client = client;
  }
  async publish(message) {
    console.log(this.event)
    try {
      await this.client.send({
        topic: this.event.topic,
        messages: [
          {
            value: message,
            key: "1",
            partition: 0,
          },
        ],
      });
      console.log("Data has been sent successfully");
    } catch (error) {
      console.log("producer.js/Something went wrong: ", error);
    }
  }
}

module.exports = { BasePublisher };
