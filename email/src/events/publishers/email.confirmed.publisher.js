const {
    BasePublisher,
  } = require("../../../../common/src/events/base.publisher");
  const {
    EmailConfirmedEvent,
  } = require("../../../../common/src/events/email.confirmed.event");
  
  class EmailConfirmedPublisher extends BasePublisher {
    client;
    event = EmailConfirmedEvent;
    constructor(client) {
      super(client);
      this.client = client;
    }
  }
  
  module.exports = { EmailConfirmedPublisher };
  