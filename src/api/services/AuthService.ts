import axios from "axios";
import { CalendarTask, User } from "../../models/models";

export const API_URL = "";

class AuthService {
  _currentToken = "";
  get currentToken(): string {
    return this._currentToken;
  }

  set currentToken(value: string) {
    this._currentToken = value;
  }

  isAutheticated() {
    return this._currentToken != "";
  }

  async signIn(user: User) {
    try {
      const response = await axios.post(API_URL + "/auth/login", user);
      const data: string = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(user: User) {
    try {
      console.log("sign out");
    } catch (error) {
      console.log(error);
    }
  }

  async signOut(user: User) {
    this._currentToken = "";
  }
}

const authService = new AuthService();
export default authService;
