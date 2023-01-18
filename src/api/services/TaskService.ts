import axios from "axios";
import { CalendarTask } from "../../models/models";

export const API_URL = "";
export const postTask = async (task: CalendarTask) => {
  try {
    const response = await axios.post(API_URL, task);
    const data: Promise<CalendarTask> = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTaskById = async (taskId: number) => {
  try {
    const response = await axios.get(API_URL + "/id/" + taskId);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTasksByDate = async (date: Date) => {
  try {
    const response = await axios.get(API_URL + "/date/" + date.toISOString());
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (task: CalendarTask) => {
  // console.log(task);
  try {
    const response = await axios.put(API_URL, task);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await axios.delete(API_URL + "?date=" + taskId);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
