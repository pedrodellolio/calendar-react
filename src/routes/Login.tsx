import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface UserInput {
  username: string;
  password: string;
}

function Login() {
  const authContext = useAuth();
  let [userInput, setUserInput] = useState<UserInput>({
    username: "",
    password: "",
  });

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      authContext.SignIn(userInput.username, userInput.password);
      setUserInput({ username: "", password: "" });
    } catch (error) {
      !error ? console.log("No server response") : console.log(error);
    }
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
