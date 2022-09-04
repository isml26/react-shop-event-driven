const { Kafka } = require("kafkajs");
const { KAFKA_CONFIG } = require("../utils/config");
const { client } = require("../loaders/database");

function initializeKafka() {
  global.kafka = new Kafka({
    clientId: KAFKA_CONFIG.clientId,
    brokers: [KAFKA_CONFIG.broker],
  });
  console.log("Initialized Kafka");
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
  try {
    //consumer group
    global.consumer = global.kafka.consumer({
      groupId: KAFKA_CONFIG.groupId,
    });
    console.log("Connecting to kafka consumer...");
    await global.consumer.connect();
    console.log("Connected to kafka consumer...");

    // // Consumer subscribe
    await global.consumer.subscribe({
      topic: KAFKA_CONFIG.topic,
      fromBeginning: true,
    });

    await global.consumer.run({
      eachMessage: async (res) => {
        console.log(
          `Received message: ${res.message.value}, key:${res.message.key} , Partition => ${res.partition} `
        );
      },
    });
  } catch (error) {
    console.log("consumer.js/Something went wrong: ", error);
  }
}

async function produceMessage(id, message) {
  try {
    await global.producer.send({
      topic: KAFKA_CONFIG.topic,
      messages: [
        {
          value: message,
          key: id,
          partition: 0,
        },
      ],
    });
    console.log("Data has been sent successfully");
  } catch (error) {
    console.log("producer.js/Something went wrong: ", error);
  }
}