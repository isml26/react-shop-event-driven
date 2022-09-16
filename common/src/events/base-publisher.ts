import { Topics } from "./topics";
import { Producer } from "kafkajs";

interface Event {
  topic: Topics;
  data: any;
}

export abstract class BasePublisher<T extends Event> {
  abstract topic: T["topic"];
  protected client: Producer;
  constructor(client: Producer) {
    this.client = client;
  }
  async publish(data: T["data"]) {
    try {
      await this.client.send({
        topic: this.topic,
        messages: [
          {
            value: JSON.stringify(data),
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
