import { useAuth } from "../hooks/useAuth";
import Calendar from "./Calendar";
import Login from "./Login";

export default function Root() {
  const authContext = useAuth();
  return (
    <>
      <nav>
        <ul className="flex">
          <li>
            <a href={`/login`}>Login</a>
          </li>
          <li> | </li>
          <li>
            <a href={`/calendar`}>Calendar</a>
          </li>
        </ul>
      </nav>
      <div>{authContext.isAuthenticated ? <Calendar /> : <Login />}</div>
    </>
  );
}
