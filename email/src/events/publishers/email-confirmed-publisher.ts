import { BasePublisher } from "../../../../common/src/events/base-publisher";
import { EmailConfirmedEvent } from "../../../../common/src/events/email-confirmed-event";
import { Topics } from "../../../../common/src/events/topics";

export class EmailConfirmedPublisher extends BasePublisher<EmailConfirmedEvent> {
  readonly topic = Topics.EmailConfirmed;
}
