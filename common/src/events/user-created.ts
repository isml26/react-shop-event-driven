import { Topics } from "./topics";

export interface UserCreatedEvent {
  topic: Topics.UserCreated;
  data: {
    user_id: string;
    email: string;
  };
}
