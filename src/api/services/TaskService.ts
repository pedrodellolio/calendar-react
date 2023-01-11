import axios from "axios";
import { CalendarTask } from "../../models/models";

const API_URL = "";
export const postTask = async (task: CalendarTask) => {
  try {
    await axios.post(API_URL, task);
  } catch (error) {
    console.log(error);
  }
};

export const getTasksByDate = async (date: Date) => {
  try {
    const response = await fetch(API_URL + "?date=" + date.toISOString());
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
