const app = require("./loaders/app");
const { kafkaWrapper } = require("./kafka-wrapper");
const { KAFKA_CONFIG } = require("./utils/config");
const {
  UserSignedUpListener,
} = require("./events/listeners/user.signed.up.listener");

async function startServer() {
  try {
    await kafkaWrapper.connect(KAFKA_CONFIG);
    await new UserSignedUpListener(global.consumer).listen();
  } catch (error) {
    console.log(error);
  }

  app.listen(3002, () => {
    console.log("Listening on 3002");
  });
}

startServer();
