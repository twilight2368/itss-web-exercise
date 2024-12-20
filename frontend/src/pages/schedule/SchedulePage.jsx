import { useTranslation } from "react-i18next";
import CalendarDisplay from "../../components/calendar/CalendarDisplay";
import MakeExerciseModal from "../../components/modals/MakeExerciseModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import * as XLSX from "xlsx";

const excelDateToJSDate = (excelDate) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const offset = new Date("1900-01-01").getTime();
  const adjustedDate = (excelDate - 2) * millisecondsPerDay + offset;
  return new Date(adjustedDate);
};

const parseTimeString = (timeStr) => {
  const [hours, minutes] = timeStr.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes), 0);
  return date;
};

const formatTo24Hour = (date) => {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function SchedulePage() {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const user_id = useSelector((state) => state.user.user_id);

  useEffect(() => {
    if (user_id !== "") {
      axios.get(`/api/schedule/${user_id}`).then((response) => {
        letParsedEvent(response.data.schedules);
      });
    }
  }, [t]);

  const letParsedEvent = (schedules) => {
    if (schedules && schedules.length) {
      const parsedEvents = schedules.map((event) => ({
        title: t(event.value),
        start: new Date(event.time_start),
        end: new Date(event.time_end),
      }));
      setEvents(parsedEvents);
    } else {
      setEvents([]);
    }
  };

  const handlingImportXLSX = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formattedEvents = jsonData.map((row) => {
        const eventDate = excelDateToJSDate(parseInt(row.date));

        let startTime, endTime;

        if (typeof row.time_start === "number") {
          const startHours = Math.floor(row.time_start * 24);
          const startMinutes = Math.round(
            (row.time_start * 24 - startHours) * 60
          );
          startTime = new Date();
          startTime.setHours(startHours, startMinutes, 0);
        } else {
          startTime = parseTimeString(row.time_start);
        }

        if (typeof row.time_end === "number") {
          const endHours = Math.floor(row.time_end * 24);
          const endMinutes = Math.round((row.time_end * 24 - endHours) * 60);
          endTime = new Date();
          endTime.setHours(endHours, endMinutes, 0);
        } else {
          endTime = parseTimeString(row.time_end);
        }

        const startDateTime = new Date(eventDate);
        startDateTime.setHours(startTime.getHours(), startTime.getMinutes());

        const endDateTime = new Date(eventDate);
        endDateTime.setHours(endTime.getHours(), endTime.getMinutes());

        return {
          events: row.events,
          time_start: startDateTime,
          time_end: endDateTime,
        };
      });

      const formattedList = formattedEvents.map((event) => ({
        event: event.events,
        time_start: formatTo24Hour(event.time_start),
        time_end: formatTo24Hour(event.time_end),
        date: event.time_start.toLocaleDateString(),
      }));

      console.log(formattedList);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="w-full h-16 border-b-2">
        <h1 className="text-3xl">{t("schedulePage.header")}</h1>
      </div>
      <div className="w-full h-16 px-6 mt-6 mb-12">
        <div className="relative w-1/6 h-full hover:cursor-pointer">
          <button className="p-4 w-full h-full font-bold bg-purple-50 shadow-md shadow-purple-300 rounded-md">
            {t("schedulePage.import_calendar")}
          </button>
          <input
            type="file"
            accept=".xlsx,.xls"
            className="absolute top-0 left-0 h-full w-full opacity-0 hover:cursor-pointer"
            onChange={handlingImportXLSX}
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
