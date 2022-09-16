import { app } from "./loaders/app";
import { kafkaWrapper } from "./loaders/kafkaWrapper";
import { Kafka, Producer, Consumer } from "kafkajs";
import { KAFKA_CONFIG } from "./config/config";
import { UserCreatedListener } from "./events/listeners/user-created.listener";

declare global {
  var kafka: Kafka;
  var producer: Producer;
  var consumer: Consumer;
}

async function startServer() {
  try {
    await kafkaWrapper.connect(KAFKA_CONFIG);
    await new UserCreatedListener(global.consumer).listen();
  } catch (error) {
    console.log(error);
  }

  app.listen(3002, () => {
    console.log("Listening on 3002");
  });
}

startServer();
