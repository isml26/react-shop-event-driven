import { Subjects } from "./subject";

export interface EmailConfirmedEvent {
  subject: Subjects.EmailConfirmed;
  data: {
    user_id: string;
    email: string;
  };
}
