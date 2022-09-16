import { BaseListener } from "../../../../common/src/events/base-listener";
import { EmailConfirmedEvent } from "../../../../common/src/events/email-confirmed-event";
import { Topics } from "../../../../common/src/events/topics";

import { User } from "../../models/User";

class EmailConfirmedListener extends BaseListener<EmailConfirmedEvent> {
  readonly subject = Topics.EmailConfirmed;
  async onMessage(data: EmailConfirmedEvent["data"]) {
    await User.findByIdAndUpdate(
      {
        _id: data.user_id,
      },
      {
        confirmed: true,
      }
    );
  }
}

export { EmailConfirmedListener };

/**
 * Are you sure you want to delete topic 'email-confirmed'?
 *  The cluster is configured with 'auto.create.topics.enable=true',
 * so the topic might be recreated automatically.
 */
