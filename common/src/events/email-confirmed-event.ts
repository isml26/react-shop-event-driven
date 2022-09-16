import { Topics } from "./topics";

export interface EmailConfirmedEvent {
  topic: Topics.EmailConfirmed;
  data: {
    user_id: string;
  };
}
