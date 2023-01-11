export interface User {
  id: number;
  name: string;
}

export interface CalendarTask {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  user: User;
}
export interface Month {
  number: number;
  name: string;
  daysInMonth: Day[];
}

export interface Day {
  id: number;
  number: number;
  tasks: CalendarTask[];
}
