class BaseListener {
  client;
  event;
  constructor(client) {
    this.client = client;
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

module.exports = { BaseListener };
