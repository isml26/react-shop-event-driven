const { Kafka } = require("kafkajs");

class KafkaWrapper {
  KAFKA_CONFIG;
  constructor(KAFKA_CONFIG) {
    this.KAFKA_CONFIG = KAFKA_CONFIG;
  }
  async connect() {
    await initializeKafka();
    await connectKafkaProducer();
    await connectKafkaConsumer();

    function initializeKafka() {
      return new Promise((resolve, reject) => {
        try {
          global.kafka = new Kafka({
            clientId: KAFKA_CONFIG.clientId,
            brokers: [KAFKA_CONFIG.broker],
          });
          console.log("Initialized kafka");
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
        groupId: KAFKA_CONFIG.groupId,
      });
      await global.consumer.connect();
      console.log("Connected to kafka consumer...");
    }
  }
}

module.exports = {
    kafkaWrapper:new KafkaWrapper()
}
