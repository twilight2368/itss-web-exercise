import React, { useState, useEffect } from "react";
import moment from "moment"; // Import moment.js
import { useTranslation } from "react-i18next";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserInfo } from "../../store/UserSlicer";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";

export default function TargetHealthImprovePage() {
  const { t } = useTranslation();
  const user_info = useSelector((state) => state.user.user_info);
  const [description, setDescription] = useState("");
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user_info) {
      const { target } = user_info;
      setDescription(target.health_improve.description || "");
      setTimeStart(
        target.health_improve.time_start
          ? moment(target.health_improve.time_start)
          : null
      );
      setTimeEnd(
        target.health_improve.time_end
          ? moment(target.health_improve.time_end)
          : null
      );
      setRating(target.health_improve.evaluate || 0);
    }
  }, [user_info]);

  const handleSave = async () => {
    try {
      const payload = {
        description,
        time_start: timeStart ? timeStart.toISOString() : null,
        time_end: timeEnd ? timeEnd.toISOString() : null,
        evaluate: rating,
      };

      const response = await axios.put(
        `/api/update_health/${user_info._id}`,
        payload
      );
      if (response.status === 200) {
        toast.success(t("health_improve.update_success"));
        dispatch(setUserInfo(response.data.user));
      }
    } catch (error) {
      console.error("Error updating health improvement target:", error);
      toast.error(t("health_improve.update_error"));
    }
  };

  return (
    <div className="min-h-screen w-full p-6">
      <div className="w-full h-16 border-b-2 mb-12">
        <h1 className="text-3xl">{t("links.health_improve")}</h1>
      </div>
      <div className="w-full px-6 mb-6">
        <div className="w-full h-16 border-b-2">
          <h2 className="text-2xl">{t("health_improve.title")}</h2>
        </div>
      </div>
      {user_info ? (
        <>
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
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-md p-3 min-h-48 max-h-60"
            ></textarea>
          </div>
          <div className="w-1/2 flex flex-row gap-6 px-6 mb-6">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label={t("health_improve.time_start")}
                  value={timeStart}
                  onChange={(newValue) => setTimeStart(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label={t("health_improve.time_end")}
                  value={timeEnd}
                  onChange={(newValue) => setTimeEnd(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="w-1/2 px-8 my-6">
            <Rating
              name="health-improve-rating"
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
          </div>
          <div className="w-1/2 px-6 mb-24">
            <Button variant="contained" onClick={handleSave}>
              {t("health_improve.save")}
            </Button>
          </div>
        </>
      ) : (
        <p>{t("health_improve.no_user_info")}</p>
      )}
    </div>
  );
}
