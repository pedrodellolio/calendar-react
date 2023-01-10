import axios from "axios";
import { useEffect, useState } from "react";
import { moveSyntheticComments } from "typescript";
import { getMonthName } from "../constants/monthNames";
import DayCard from "./DayCard";

interface Props {
  //   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CalendarTask {
  id: number;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
}

interface Month {
  number: number;
  name: string;
  daysInMonth: Day[];
}

interface Day {
  number: number;
  tasks: CalendarTask[];
}

const MONTH_COUNT = 12;

function Calendar(props: Props) {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [currentYear, setCurrentYear] = useState<number>(2023);
  let [months, setMonths] = useState<Month[]>([]);
  let [currentMonth, setCurrentMonth] = useState<Month>({
    number: 0,
    name: "",
    daysInMonth: [],
  });

  function generateMonths() {
    let monthsArray = [] as Month[];

    const daysPerMonth = [...Array(MONTH_COUNT)].map((_, i) => {
      return getDaysInMonth(i, currentYear);
    });

    [...Array(MONTH_COUNT)].forEach((_, i) => {
      var daysInMonth = [] as Day[];
      [...Array(daysPerMonth[i])].map((_, i) => {
        daysInMonth.push({
          number: i + 1,
          tasks: [],
        });
      });

      monthsArray.push({
        name: getMonthName(i),
        number: i + 1,
        daysInMonth: daysInMonth,
      });
    });
    setMonths(monthsArray);
    return monthsArray;
  }

  useEffect(() => {
    const monthsArray = generateMonths();
    monthsArray.forEach((month) => {
      month.daysInMonth.forEach((day) => {
        getTasksByDate(
          new Date(currentYear, month.number - 1, day.number)
        ).then((res) => {
          day.tasks = res;
        });
      });
    });
    setCurrentMonth(monthsArray[0]);
  }, []);
  console.log(months);

  async function getTasksByDate(date: Date): Promise<CalendarTask[]> {
    var tasks = [] as CalendarTask[];
    await fetch(
      "" + date.toISOString()
    )
      .then((res) => res.json())
      .then((e) => {
        tasks = e;
      });
    return tasks;
  }

  function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  function changeMonth(option: number) {
    // var prevMonth = currentMonth;
    // setCurrentMonth({
    //   number: 0,
    //   name: "",
    //   daysInMonth: [],
    // });
    setCurrentMonth((prevState) => {
      return months[prevState.number - 1 + option];
    });
  }

  return (
    <div className="Calendar flex flex-col mt-5 px-3 m-auto">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {/* {JSON.stringify(currentMonth)} */}
          <div className="header mb-3 flex align-middle">
            <span className="w-20">{currentMonth.name}</span>
            <div className="mx-3 mt-0">
              <button
                disabled={currentMonth.number <= 0}
                onClick={() => changeMonth(-1)}
              >
                <span className="rounded-md border border-transparent bg-blue-100 px-1 mx-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 material-symbols-rounded material-symbols-rounded">
                  arrow_back_ios
                </span>
              </button>
              <button
                type="button"
                disabled={currentMonth.number >= 11}
                onClick={() => changeMonth(1)}
              >
                <span className="rounded-md border border-transparent bg-blue-100 px-1 py-0 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 material-symbols-rounded">
                  arrow_forward_ios
                </span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 grid-flow-row gap-0">
            {currentMonth.daysInMonth.map((day) => {
              return (
                <DayCard
                  // setIsModalOpen={setIsModalOpen}
                  key={day.number}
                  monthOfYear={currentMonth.number}
                  dayOfMonth={day.number}
                  tasks={day.tasks}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
