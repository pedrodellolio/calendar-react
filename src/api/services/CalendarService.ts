import { CalendarTask } from "../../models/Calendar";
import api from "./Api";

class CalendarService {
  async postTask(task: CalendarTask) {
    try {
      const response = await api.post("/calendar", task);
      const data: Promise<CalendarTask> = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getTaskById(taskId: number) {
    try {
      const response = await api.get("/calendar/id/" + taskId);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getTasksByDate(date: Date) {
    try {
      const response = await api.get("/calendar/date/" + date.toISOString());
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTask(task: CalendarTask) {
    try {
      const response = await api.put("/calendar", task);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(taskId: number) {
    try {
      const response = await api.delete("/calendar/id/" + taskId);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
const calendarService = new CalendarService();
export default calendarService;
