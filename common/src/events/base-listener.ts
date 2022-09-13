import { Message } from "kafkajs";
import { Subjects } from "./subject";
import {Consumer} from "kafkajs";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class BaseListener<T extends Event> {
  abstract subject: T["subject"];
  abstract onMessage(data: T["data"], msg: Message): void;
  client;
  constructor(client: Consumer) {
    this.client = client;
  }
  async listen() {
    await this.client.subscribe({
      topic: this.subject,
      fromBeginning: true,
    });
    await this.client.run({
      eachMessage: async ({message,partition}) => {
        console.log(
          `Received message: ${message.value}, Partition => ${partition} `
        );
        const parsedData = this.parseMessage(message);
        this.onMessage(parsedData, message);
      },
    });
  }

  //if we get string or if we get buffer
  parseMessage(msg: Message) {
    const data = msg.value;
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data!.toString("utf8"));
  }
}
