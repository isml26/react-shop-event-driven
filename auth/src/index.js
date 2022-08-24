const app = require("./loaders/app");
const { connectDB } = require("./loaders/mongoose");


async function startServer() {
  app.listen(3001, () => {
    console.log("Listening on 3001");
  });
  connectDB();
}

startServer();
