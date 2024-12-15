import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
export default function TargetHealthImprovePage() {
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  return (
    <div className=" min-h-screen w-full p-6">
      <div className="w-full h-16 border-b-2 mb-12 ">
        <h1 className=" text-3xl">{t("links.health_improve")}</h1>
      </div>
      <div className="w-full px-6 mb-6">
        <div className="w-full h-16 border-b-2 ">
          <h2 className=" text-2xl">{t("health_improve.title")}</h2>
        </div>
      </div>
      <div className="w-full px-6 mb-6">
        <label
          htmlFor="description"
          className="block text-gray-700 font-medium mb-2"
        >
          {t("health_improve.description")}
        </label>
        <textarea
          id="description"
          placeholder={t("health_improve.description")}
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Updates state on input
          className="w-full border-2 border-gray-300 rounded-md p-3 min-h-48 max-h-60"
        ></textarea>
      </div>
      <div className="w-1/2 flex flex-row gap-6 px-6 mb-6">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label={t("health_improve.time_start")} />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label={t("health_improve.time_end")} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="w-1/2 px-8 my-6">
        <Rating name="simple-controlled" />
      </div>
      <div className="w-1/2 px-6 mb-24">
        <Button variant="contained">{t("health_improve.save")}</Button>
      </div>
    </div>
  );
}
