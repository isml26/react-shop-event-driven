class EmailConfirmedListener {
  topic = "email-confirmed";
  client;
  constructor() {
    this.client = global.consumer
  }
  async listen() {
    console.log("EmailConfirmedListener")
    await this.client.subscribe({
      topic: this.topic,
      fromBeginning: true,
    });
    await this.client.run({
      eachMessage: async (res) => {
        console.log(
          `Received message: ${res.message.value}, key:${res.message.key} , Partition => ${res.partition} `
        );
      },
    });
  }
}

module.exports = {
  EmailConfirmedListener,
};
