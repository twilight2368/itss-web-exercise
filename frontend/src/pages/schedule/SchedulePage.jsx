import { useTranslation } from "react-i18next";
import CalendarDisplay from "../../components/calendar/CalendarDisplay";
import { Button } from "@mui/material";
import MakeExerciseModal from "../../components/modals/MakeExerciseModal";

export default function SchedulePage() {
  const { t } = useTranslation();
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
        <CalendarDisplay />
      </div>
      <div className="w-full h-16 px-6 my-6">
        <MakeExerciseModal />
      </div>
    </div>
  );
}
