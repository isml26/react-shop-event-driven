import { Kafka,Producer,Consumer } from "kafkajs";

interface KAFKA_CONFIG_INTERFACE {
  clientId: string;
  broker: string;
  groupId: string;
}

class KafkaWrapper {
  constructor() {}
  async connect(CONFIG: KAFKA_CONFIG_INTERFACE) {
    await initializeKafka();
    await connectKafkaProducer();
    await connectKafkaConsumer();

    function initializeKafka() {
      return new Promise((resolve, reject) => {
        try {
          global.kafka = new Kafka({
            clientId: CONFIG.clientId,
            brokers: [CONFIG.broker],
          });
          console.log("Initialized kafka");
          //@ts-ignore
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }

    async function connectKafkaProducer() {
      try {
        global.producer = global.kafka.producer();
        await global.producer.connect();
        console.log("Connected to kafka producer...");
      } catch (error) {
        console.log(error);
      }
    }

    async function connectKafkaConsumer() {
      global.consumer = global.kafka.consumer({
        groupId: CONFIG.groupId,
      });
      await global.consumer.connect();
      console.log("Connected to kafka consumer...");
    }
  }

  async disconnect() {
    Promise.all([
      global.producer.disconnect(),
      global.consumer.disconnect(),
    ]).then(() => {
      console.log("Kafka connection closed");
    });
  }
}

export const kafkaWrapper = new KafkaWrapper();
