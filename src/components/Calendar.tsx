import { useEffect, useState } from "react";
import { moveSyntheticComments } from "typescript";
import { getMonthName } from "../constants/monthNames";
import DayCard from "./DayCard";

interface Props {
  //   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Calendar(props: Props) {
  let [currentYear, setCurrentYear] = useState<number>(2023);
  let [daysInMonth, setDaysInMonth] = useState<number[]>();
  let [currentMonth, setCurrentMonth] = useState<number>(0);
  //   let [isModalOpen, setIsModalOpen] = useState(false);
  //   useEffect(() => {
  //     props.setIsModalOpen(isModalOpen);
  //   }, [isModalOpen]);
  useEffect(() => {
    const daysArray = [...Array(12)].map((_, i) => {
      return getDaysInMonth(i + 1, currentYear);
    });
    setDaysInMonth(daysArray);
  }, []);

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month+1, 0).getDate();
  }

  function changeMonth(option: number) {
    setCurrentMonth((prevState) => {
      return prevState + option;
    });
    return;
  }

  return (
    <div
      className="Calendar flex flex-col mt-5 px-3 m-auto"
    //   style={{ width: 1400 }}
    >
      <div className="header mb-3 flex align-middle">
        <span className="w-20">{getMonthName(currentMonth)}</span>
        <div className="mx-3 mt-0">
          <button disabled={currentMonth <= 0} onClick={() => changeMonth(-1)}>
            <span className="rounded-md border border-transparent bg-blue-100 px-1 mx-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 material-symbols-rounded material-symbols-rounded">
              arrow_back_ios
            </span>
          </button>
          <button
            type="button"
            disabled={currentMonth >= 11}
            onClick={() => changeMonth(1)}
          >
            <span className="rounded-md border border-transparent bg-blue-100 px-1 py-0 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 material-symbols-rounded">
              arrow_forward_ios
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 grid-flow-row gap-0">
        {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, i) => (
          <DayCard
            // setIsModalOpen={setIsModalOpen}
            key={i + 1}
            dayOfMonth={i + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
