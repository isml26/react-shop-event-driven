const app = require("./loaders/app");
const { connectDB } = require("./loaders/mongoose");


async function startServer() {
  if(!process.env.JWT_KEY){
    throw new Error("JWT_KEY must be defined!")
  }
  app.listen(3001, () => {
    console.log("Listening on 3001");
  });
  connectDB();
}

startServer();
