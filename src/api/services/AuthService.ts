import { User } from "../../models/User";
import api from "./Api";

class AuthService {
  async signIn(username: string, password: string): Promise<User | undefined> {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      const data = await response.data;
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
}

const authService = new AuthService();
export default authService;
