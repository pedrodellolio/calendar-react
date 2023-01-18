export interface CalendarTask {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  userId: number;
  user: User;
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

export interface User {
  username: string;
  password?: string;
  token?: string;
}
