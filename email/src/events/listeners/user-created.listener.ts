import { BaseListener } from "../../../../common/src/events/base-listener";
import { UserCreatedEvent } from "../../../../common/src/events/user-created";
import { Topics } from "../../../../common/src/events/topics";
import {send_email} from "../../services/email";

class UserCreatedListener extends BaseListener<UserCreatedEvent> {
  readonly subject = Topics.UserCreated;
  async onMessage(data: UserCreatedEvent["data"]) {
    send_email(data);
  }
}

export { UserCreatedListener };

/**
 * Are you sure you want to delete topic 'email-confirmed'?
 *  The cluster is configured with 'auto.create.topics.enable=true',
 * so the topic might be recreated automatically.
 */
