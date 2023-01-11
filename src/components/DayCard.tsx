import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { postTask } from "../api/services/TaskService";
import { getMonthName } from "../constants/monthNames";
import { CalendarTask } from "../models/models";

interface Props {
  currentYear: number;
  dayOfMonth: number;
  monthOfYear: number;
  tasks: CalendarTask[];
  updateCurrentMonth: (index: number) => void;
}

function DayCard(props: Props) {
  let [isOpen, setIsOpen] = useState(false);
  let [currentTask, setCurrentTask] = useState({
    id: 0,
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    user: { id: 1, name: "Pedro" },
  } as CalendarTask);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    var task = {
      id: 0,
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      user: { id: 1, name: "Pedro" },
    } as CalendarTask;
    setCurrentTask(task);
    setIsOpen(true);
  }

  const handleDateInput = (option: number, event: any) => {
    var ms = Date.parse(
      `${props.currentYear}-${props.monthOfYear.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })}-${props.dayOfMonth.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })}T${event.target.value}`
    );
    console.log(
      `${props.currentYear}-${props.monthOfYear.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })}-${props.dayOfMonth.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })}T${event.target.value}`
    );
    option === 1
      ? setCurrentTask((prevState) => {
          return { ...prevState, startDate: new Date(ms) };
        })
      : setCurrentTask((prevState) => {
          return { ...prevState, endDate: new Date(ms) };
        });
  };

  const handleTitleChange = (event: any) => {
    setCurrentTask((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const handleDescriptionChange = (event: any) => {
    setCurrentTask((prevState) => {
      return { ...prevState, description: event.target.value };
    });
  };

  const saveTask = (event: any) => {
    event.preventDefault();
    console.log(currentTask);
    postTask(currentTask).then(() => {
      props.updateCurrentMonth(props.monthOfYear);
    });
    closeModal();
  };

  return (
    <div className="">
      <div onClick={openModal} className="DayCard border border-black-300 h-44">
        <div className="flex flex-col justify-end p-1 px-3 w-full">
          <span className="text-gray-800 font-normal">{props.dayOfMonth}</span>
          <div>
            {props.tasks.map((task, i) => {
              return (
                <div
                  key={i}
                  title={task.title}
                  className="mt-2 bg-green-300 rounded-lg"
                >
                  <p className="p-2 text-xs whitespace-nowrap truncate">
                    {task.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={saveTask}>
                    <Dialog.Title
                      as="h3"
                      className="mb-8 text-lg font-medium leading-6 text-gray-900"
                    >
                      <input
                        value={currentTask.title}
                        onChange={handleTitleChange}
                        className="mx-2"
                        placeholder="New appointment"
                        autoFocus
                      ></input>
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="mb-8 flex">
                        <p>
                          {getMonthName(props.monthOfYear)}, {props.dayOfMonth}
                        </p>
                        <div className="mx-3">
                          <input
                            onChange={(event) => handleDateInput(1, event)}
                            className="border text-center"
                            type="time"
                          ></input>
                          <span className="mx-2">-</span>
                          <input
                            onInput={(event) => handleDateInput(0, event)}
                            className="border"
                            type="time"
                          ></input>
                        </div>
                      </div>
                      <div className="mb-8">
                        <label className="block">Description</label>
                        <textarea
                          value={currentTask.description}
                          onChange={handleDescriptionChange}
                          className="border"
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Save
                      </button>
                      <a
                        href="#"
                        type="button"
                        className="mx-3 cursor-pointer inline-flex justify-centerpx-4 py-2 text-sm font-medium text-blue-900 "
                        onClick={closeModal}
                      >
                        Close
                      </a>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default DayCard;
