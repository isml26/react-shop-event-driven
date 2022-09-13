const { BaseListener } = require("../../../../common/src/events/base.listener");
const {
  UserCreatedEvent,
} = require("../../../../common/src/events/user.created.event");
const {send_email} = require("../../services/email")
class UserSignedUpListener extends BaseListener {
  client;
  event = UserCreatedEvent;
  constructor(consumer) {
    super(consumer);
    this.client = consumer;
  }

  async listen() {
    console.log(UserCreatedEvent.topic,"listen");

    await this.client.subscribe({
      topic: UserCreatedEvent.topic,
      fromBeginning: true,
    });
    await this.client.run({
      eachMessage: async (res) => {
        // console.log(
        //   `Received message: ${res.message.value}, Partition => ${res.partition} `
        // );
        this.event.data = JSON.parse(res.message.value)
        // this.event = data;
        send_email(this.event.data)
        console.log(this.event.data)
        
        // set user_confirmed = true
      },
    });
  }
}

module.exports = {
  UserSignedUpListener,
};

/**
 * Are you sure you want to delete topic 'email-confirmed'?
 *  The cluster is configured with 'auto.create.topics.enable=true',
 * so the topic might be recreated automatically.
 */
