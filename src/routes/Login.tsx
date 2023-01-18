import { useState } from "react";
import authService from "../api/services/AuthService";
import { User } from "../models/models";

function Login() {
  let [userInput, setUserInput] = useState<User>({
    username: "",
    password: "",
  });

  function handleSubmit(event: any) {
    event.preventDefault();
    authService.signIn(userInput).then((token) => console.log(token));
  }

  function handleUsernameChange(input: string) {
    setUserInput((prevState) => {
      return { ...prevState, username: input };
    });
  }

  function handlePasswordChange(input: string) {
    setUserInput((prevState) => {
      return { ...prevState, password: input };
    });
  }

  return (
    <div className="Login flex justify-center mt-10">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          {/* <label className="block">Usuário</label> */}
          <input
            type="text"
            placeholder="Username"
            className="border"
            value={userInput.username}
            onChange={(event) => handleUsernameChange(event.target.value)}
            autoFocus
          />
        </div>
        <div className="mt-4">
          {/* <label className="block">Senha</label> */}
          <input
            type="password"
            placeholder="Password"
            className="border"
            value={userInput.password}
            onChange={(event) => handlePasswordChange(event.target.value)}
          />
        </div>
        <div className="mt-4">
          <button className="rounded-md p-2 bg-blue-700 text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
