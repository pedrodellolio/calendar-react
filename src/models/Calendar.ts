import { User } from "./User";

export interface CalendarTask {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  user: User | null;
}

export interface Month {
  number: number;
  name: string;
}

export interface Day {
  id: number;
  number: number;
  tasks: CalendarTask[];
}
