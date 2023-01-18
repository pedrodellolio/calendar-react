import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../api/services/TaskService";
import DayCard from "../components/DayCard";
import { MONTH_COUNT } from "../constants/common";
import { MONTHS } from "../constants/monthNames";
import { Day } from "../models/models";

function Calendar() {
  let [currentYear, setCurrentYear] = useState<number>(2023);
  let [daysInCurrentMonth, setDaysInCurrentMonth] = useState([] as Day[]);
  let [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0); //0- janeiro; 11-dezembro
  let [currentMonth, setCurrentMonth] = useState(MONTHS[currentMonthIndex]);
  let [daysPerMonth, setDaysPerMonth] = useState(
    [...Array(MONTH_COUNT)].map((_, i) => {
      return getDaysInMonth(i, currentYear);
    })
  );

  useEffect(() => {
    const updateDayTasks = async (date: Date) => {
      const response = await axios.get(API_URL + "?date=" + date.toISOString());
      return response.data;
    };

    var daysInMonth = [] as Day[];
    for (let i = 0; i < daysPerMonth[currentMonthIndex]; i++) {
      daysInMonth.push({
        id: i,
        number: i + 1,
        tasks: [],
      });
    }

    for (let i = 0; i < daysInMonth.length; i++) {
      updateDayTasks(new Date(currentYear, currentMonthIndex, i + 1)).then(
        (data) => {
          daysInMonth[i].tasks = data;
        }
      );
    }

    setTimeout(() => {
      setDaysInCurrentMonth(daysInMonth.sort());
    }, 500);
  }, [currentMonth]);

  function updateCurrentMonth(index: number) {
    setCurrentMonth(MONTHS[index]);
  }

  function updateDaysInCurrentMonth(days: Day[]) {
    setDaysInCurrentMonth(days);
  }

  function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  function changeMonth(option: number) {
    setCurrentMonth((prevState) => {
      setCurrentMonthIndex(MONTHS.indexOf(prevState) + option);
      return MONTHS[MONTHS.indexOf(prevState) + option];
    });
  }

  return (
    <div
      className={
        "flex flex-col mt-5 px-3 m-auto " +
        (true ? "opacity-100" : "opacity-100")
      }
    >
      <div>
        <div>
          <div className=" header mb-3 flex align-middle">
            <span className="w-20">{currentMonth}</span>
            <div className="mx-3 mt-0">
              <button
                disabled={currentMonthIndex == 0}
                onClick={() => changeMonth(-1)}
              >
                <span className="rounded-md border border-transparent bg-blue-100 px-1 mx-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 material-symbols-rounded material-symbols-rounded">
                  arrow_back_ios
                </span>
              </button>
              <button
                type="button"
                disabled={currentMonthIndex == 11}
                onClick={() => changeMonth(1)}
              >
                <span className="rounded-md border border-transparent bg-blue-100 px-1 py-0 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 material-symbols-rounded">
                  arrow_forward_ios
                </span>
              </button>
            </div>
          </div>
          {daysInCurrentMonth.length === 0 ? (
            <div>Carregando...</div>
          ) : (
            <div className="grid grid-cols-7 grid-flow-row gap-0">
              {daysInCurrentMonth.map((day, i) => {
                return (
                  <DayCard
                    key={day.id}
                    currentYear={currentYear}
                    monthOfYear={currentMonthIndex + 1}
                    dayOfMonth={day.number}
                    tasks={day.tasks}
                    updateCurrentMonth={updateCurrentMonth}
                    daysInCurrentMonth={daysInCurrentMonth}
                    updateDaysInCurrentMonth={updateDaysInCurrentMonth}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
