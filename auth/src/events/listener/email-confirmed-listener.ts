import { Message } from "kafkajs";
import { BaseListener } from "../../../../common/src/events/base-listener";
import { EmailConfirmedEvent } from "../../../../common/src/events/email-confirmed-event";
import { Subjects } from "../../../../common/src/events/subject";

import { User } from "../../models/User";

class EmailConfirmedListener extends BaseListener<EmailConfirmedEvent> {
  readonly subject = Subjects.EmailConfirmed;
  onMessage(data: EmailConfirmedEvent["data"], msg: Message): void {
    console.log(data);
  }
}

export { EmailConfirmedListener };

/**
 * Are you sure you want to delete topic 'email-confirmed'?
 *  The cluster is configured with 'auto.create.topics.enable=true',
 * so the topic might be recreated automatically.
 */
