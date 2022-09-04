const app = require("./loaders/app");


async function startServer() {
  app.listen(3002, () => {
    console.log("Listening on 3002");
  });
}

startServer();
