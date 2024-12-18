import { useTranslation } from "react-i18next";
import CalendarDisplay from "../../components/calendar/CalendarDisplay";
import MakeExerciseModal from "../../components/modals/MakeExerciseModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";

export default function SchedulePage() {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const user_id = useSelector((state) => state.user.user_id);

  useEffect(() => {
    if (user_id !== "") {
      axios.get(`/api/schedule/${user_id}`).then((response) => {
        // console.log(response.data);

        letParsedEvent(response.data.schedules);
      }); // Adjust to your API endpoint
    }
  }, [t]);

  const letParsedEvent = (schedules) => {
    if (schedules && schedules.length) {
      // Parse event data into the required format
      const parsedEvents = schedules.map((event) => ({
        title: t(event.value), // Translate title using `t`
        start: new Date(event.time_start), // Parse start date
        end: new Date(event.time_end), // Parse end date
      }));

      setEvents(parsedEvents);
    } else {
      setEvents([]);
    }
  };

  return (
    <div className=" min-h-screen p-6">
      <div className="w-full h-16 border-b-2 ">
        <h1 className=" text-3xl">{t("schedulePage.header")}</h1>
      </div>
      <div className="w-full h-16 px-6 mt-6 mb-12">
        <div className=" relative w-1/6 h-full hover:cursor-pointer ">
          <button
            disabled
            className="p-4 w-full h-full font-bold disabled:bg-purple-50 shadow-md shadow-purple-300  rounded-md"
          >
            {t("schedulePage.import_calendar")}
          </button>
          <input
            type="file"
            className=" absolute top-0 left-0 h-full w-full opacity-0 hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full px-6 min-h-96 mb-12">
        <h2 className="mb-3 text-2xl text-center font-black pr-16">
          {t("schedulePage.calendar")}
        </h2>
        <CalendarDisplay events={events} />
      </div>
      <div className="w-full h-16 px-6 my-6">
        <MakeExerciseModal letParsedEvent={letParsedEvent} />
      </div>
    </div>
  );
}
