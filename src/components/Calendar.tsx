import { useEffect, useState, Fragment } from "react";
import { getMonthName } from "../constants/monthNames";
import DayCard from "./DayCard";
import { Dialog, Transition } from "@headlessui/react";

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
  id: number;
  number: number;
  tasks: CalendarTask[];
}

interface DayTasks {
  tasks: CalendarTask[];
}

const MONTH_COUNT = 12;

function Calendar() {
  let [monthsRendered, setMonthsRendered] = useState<boolean>(false);
  let [currentYear, setCurrentYear] = useState<number>(2023);
  let [months, setMonths] = useState<Month[]>([]);
  let [currentMonth, setCurrentMonth] = useState<Month>({
    number: 0,
    name: "",
    daysInMonth: [],
  });

  const getTasksByDate = async (date: Date) => {
    try {
      const response = await fetch(
        "" + date.toISOString()
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

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
        setMonthsRendered(true);
      }, 1000);
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
  }, [monthsRendered, setMonthsRendered, currentMonth, setCurrentMonth]);

  function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
  console.log(currentMonth);

  function changeMonth(option: number) {
    setMonthsRendered(false);
    setCurrentMonth((prevState) => {
      return months[prevState.number - 1 + option];
    });
    setMonthsRendered(true);
  }
  return (
    <div
      className={
        "flex flex-col mt-5 px-3 m-auto " +
        (!monthsRendered ? "opacity-70" : "opacity-100")
      }
    >
      <div>
        <div>
          <div className=" header mb-3 flex align-middle">
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
            {currentMonth.daysInMonth.map((day, i) => {
              return (
                <DayCard
                  key={i}
                  monthOfYear={currentMonth.number}
                  dayOfMonth={day.number}
                  tasks={day.tasks}
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
