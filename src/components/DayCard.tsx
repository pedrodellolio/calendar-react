import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { getMonthName } from "../constants/monthNames";

interface Props {
  dayOfMonth: number;
  monthOfYear: number;
  //   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DayCard(props: Props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function saveAppointment() {}

  return (
    <div className="">
      <div onClick={openModal} className="DayCard border border-black-300 h-44">
        <div className="flex justify-end p-1 px-3 w-full">
          <span className="text-gray-800 font-normal">{props.dayOfMonth}</span>
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
                  <form>
                    <Dialog.Title
                      as="h3"
                      className="mb-8 text-lg font-medium leading-6 text-gray-900"
                    >
                      <input
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
                          <input className="border text-center" type="time"></input>
                          <span className="mx-2">-</span>
                          <input className="border" type="time"></input>
                        </div>
                      </div>
                      <div className="mb-8">
                        <label className="block">Description</label>
                        <textarea className="border"></textarea>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={saveAppointment}
                      >
                        Save
                      </button>
                      <a
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
