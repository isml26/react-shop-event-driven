import app from "./loaders/app";
import { kafkaWrapper } from "./loaders/kafkaWrapper";
import { KAFKA_CONFIG } from "./configs/config";
import { connectDB } from "./loaders/mongoose";
import { Kafka, Producer, Consumer } from "kafkajs";
import { EmailConfirmedListener } from "./events/listener/email-confirmed-listener";

declare global {
  var kafka: Kafka;
  var producer: Producer;
  var consumer: Consumer;
}

const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

async function startServer() {
  if (!process.env.JWT_KEY) {
    console.log("JWT_KEY MUST BE DEFINED!!");
  }
  try {
    await kafkaWrapper.connect(KAFKA_CONFIG);
    await new EmailConfirmedListener(global.consumer).listen();
    signalTraps.forEach(type => {
      process.on(type, async () => {
        try {
          await global.consumer.disconnect()
          console.log("ehe")
        } finally {
          process.kill(process.pid, type)
        }
      })
    })

    // process.on("SIGINT", () => {
    //   global.producer.disconnect().then(() => {
    //     console.log("Disconnected from producer");
    //   });
    // });
    // process.on('SIGTERM', async() => kafkaWrapper.disconnect());
  } catch (error) {
    console.log(error);
  }
  await connectDB();
  app.listen(3001, () => {
    console.log("Listening on 3001");
  });
}
startServer();
