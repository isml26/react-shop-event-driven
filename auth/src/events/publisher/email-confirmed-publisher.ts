import { BasePublisher } from "../../../../common/src/events/base-publisher";
import { UserCreatedEvent } from "../../../../common/src/events/user-created";
import { Topics } from "../../../../common/src/events/topics";

export class UserCreatedPublisher extends BasePublisher<UserCreatedEvent> {
  readonly topic = Topics.UserCreated;
}
