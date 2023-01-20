export interface CalendarTask {
  id: number;
  title: string;
  description: string;
  startDateInMilliseconds: number;
  endDateInMilliseconds: number;
  startDate?: Date;
  endDate?: Date;
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
