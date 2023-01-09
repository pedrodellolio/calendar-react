import { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import AppointmentModal from "./components/modal/AppointmentsModal";

function App() {
  let [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="App">
      <div className="">
        <Calendar
        // setIsModalOpen={setIsModalOpen}
        />
      </div>
      {/* <AppointmentModal isOpen={isModalOpen} /> */}
    </div>
  );
}

export default App;
