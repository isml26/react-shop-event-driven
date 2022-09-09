const {
  BasePublisher,
} = require("../../../../common/src/events/base.publisher");
const {
  UserCreatedEvent,
} = require("../../../../common/src/events/user.created.event");

class UserCreatedPublisher extends BasePublisher {
  client;
  event = UserCreatedEvent;
  constructor(client) {
    super(client);
    this.client = client;
  }
  async publish(message) {
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

module.exports = { UserCreatedPublisher };
