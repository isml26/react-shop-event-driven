const app = require("./loaders/app");
const { kafkaWrapper } = require("./kafka-wrapper");
const { KAFKA_CONFIG } = require("./utils/config");
const {
  EmailConfirmedListener,
} = require("./events/listeners/email.confirmed.listener");
const { connectDB } = require("./loaders/mongoose");

async function startServer() {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }
  try {
    await kafkaWrapper.connect(KAFKA_CONFIG);
    await new EmailConfirmedListener(global.consumer).listen();
  } catch (error) {
    console.log(error);
  }

  // connectDB();
  
  app.listen(3001, () => {
    console.log("Listening on 3001");
  });
}

startServer();
