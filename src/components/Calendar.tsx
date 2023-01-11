import { useEffect, useState } from "react";
import { getTasksByDate } from "../api/services/TaskService";
import { DEFAULT_TIMEOUT, MONTH_COUNT } from "../constants/common";
import { getMonthName } from "../constants/monthNames";
import { Day, Month } from "../models/models";
import DayCard from "./DayCard";

function Calendar() {
  let [currentMonthRendered, setCurrentMonthRendered] =
    useState<boolean>(false);
  let [currentYear, setCurrentYear] = useState<number>(2023);
  let [months, setMonths] = useState([] as Month[]);
  let [currentMonth, setCurrentMonth] = useState<Month>({
    number: 0,
    name: "",
    daysInMonth: [],
  });

  useEffect(() => {
    const generateMonths = () => {
      let monthsArray = [] as Month[];

      const daysPerMonth = [...Array(MONTH_COUNT)].map((_, i) => {
        return getDaysInMonth(i, currentYear);
      });

      [...Array(MONTH_COUNT)].forEach((_, i) => {
        var daysInMonth = [] as Day[];
        [...Array(daysPerMonth[i])].forEach((_, d) => {
          daysInMonth.push({
            id: d,
            number: d + 1,
            tasks: [],
          });
        });

        monthsArray.push({
          name: getMonthName(i),
          number: i + 1,
          daysInMonth: daysInMonth,
        });
      });
      return monthsArray;
    };
    setMonths(generateMonths());
  }, []);

  useEffect(() => {
    if (months.length > 0) {
      setCurrentMonth(months[0]);
      setTimeout(() => {
        setCurrentMonthRendered(true);
      }, DEFAULT_TIMEOUT);
    }
  }, [months]);

  useEffect(() => {
    if (currentMonth.name !== "") {
      var currMonth = currentMonth;
      currMonth.daysInMonth.forEach((day) => {
        getTasksByDate(
          new Date(currentYear, currentMonth.number - 1, day.number)
        ).then((res) => (day.tasks = res));
      });

      setCurrentMonth(currMonth);
    }
  }, [setCurrentMonthRendered, currentMonthRendered, currentMonth]);

  function refreshCurrentMonth() {
    setCurrentMonth((prevState) => {
      return { ...prevState, name: prevState.name };
    });
  }

  function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  function changeMonth(option: number) {
    setCurrentMonthRendered(false);
    setCurrentMonth((prevState) => {
      return months[prevState.number - 1 + option];
    });
    setTimeout(() => {
      setCurrentMonthRendered(true);
    }, DEFAULT_TIMEOUT);
  }
  return (
    <div
      className={
        "flex flex-col mt-5 px-3 m-auto " +
        (!currentMonthRendered ? "opacity-70" : "opacity-100")
      }
    >
      <button type="button" onClick={refreshCurrentMonth}>
        Refresh
      </button>
      <div>
        <div>
          <div className=" header mb-3 flex align-middle">
            <span className="w-20">{currentMonth.name}</span>
            <div className="mx-3 mt-0">
              <button
                disabled={currentMonth.number == 1}
                onClick={() => changeMonth(-1)}
              >
                <span className="rounded-md border border-transparent bg-blue-100 px-1 mx-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 material-symbols-rounded material-symbols-rounded">
                  arrow_back_ios
                </span>
              </button>
              <button
                type="button"
                disabled={currentMonth.number == 12}
                onClick={() => changeMonth(1)}
              >
                <span className="rounded-md border border-transparent bg-blue-100 px-1 py-0 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 material-symbols-rounded">
                  arrow_forward_ios
                </span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 grid-flow-row gap-0">
            {currentMonth.daysInMonth.map((day, i) => {
              return (
                <DayCard
                  key={i}
                  currentYear={currentYear}
                  monthOfYear={currentMonth.number}
                  dayOfMonth={day.number}
                  tasks={day.tasks}
                  refreshCurrentMonth={refreshCurrentMonth}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
