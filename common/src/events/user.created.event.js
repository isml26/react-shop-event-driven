const { UserCreated } = require("./topics");

const UserCreatedEvent = {
  topic: UserCreated,
  data: {},
};

module.exports = { UserCreatedEvent };
