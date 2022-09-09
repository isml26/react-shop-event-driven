const { BaseListener } = require("../../../../common/src/events/base.listener");
const {
  EmailConfirmedEvent,
} = require("../../../../common/src/events/email.confirmed.event");

class EmailConfirmedListener extends BaseListener {
  client;
  event = EmailConfirmedEvent;
  constructor(consumer) {
    super(consumer);
    this.client = consumer;
  }

  async listen() {
    console.log(EmailConfirmedEvent.topic);

    await this.client.subscribe({
      topic: EmailConfirmedEvent.topic,
      fromBeginning: true,
    });
    await this.client.run({
      eachMessage: async (res) => {
        console.log(
          `Received message: ${res.message.value}, key:${res.message.key} , Partition => ${res.partition} `
        );
        this.event.data = res.message.value;
      },
    });
  }
}

module.exports = {
  EmailConfirmedListener,
};

/**
 * Are you sure you want to delete topic 'email-confirmed'?
 *  The cluster is configured with 'auto.create.topics.enable=true',
 * so the topic might be recreated automatically.
 */
