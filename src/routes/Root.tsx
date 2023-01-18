import Calendar from "./Calendar";

export default function Root() {
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
      <div>
        <Calendar />
      </div>
    </>
  );
}
