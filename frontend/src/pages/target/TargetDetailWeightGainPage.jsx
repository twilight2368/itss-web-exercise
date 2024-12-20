import React, { useState, useEffect } from "react";
import moment from "moment"; // Import moment.js
import { useTranslation } from "react-i18next";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserInfo } from "../../store/UserSlicer";
import { toast } from "react-toastify";

export default function TargetDetailWeightGainPage() {
  const { t } = useTranslation();
  const user_info = useSelector((state) => state.user.user_info);
  const [description, setDescription] = useState("");
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [initWeight, setInitWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [currWeight, setCurrWeight] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user_info) {
      const { target } = user_info;
      setDescription(target.gain_weight.description || "");
      setTimeStart(
        target.gain_weight.time_start
          ? moment(target.gain_weight.time_start)
          : null
      );
      setTimeEnd(
        target.gain_weight.time_end ? moment(target.gain_weight.time_end) : null
      );
      setInitWeight(target.gain_weight.init_w || 0);
      setTargetWeight(target.gain_weight.target_w || 0);
      setCurrWeight(target.gain_weight.crr_w || 0);
    }
  }, [user_info]);

  const handleSave = async () => {
    try {
      const payload = {
        description,
        time_start: timeStart ? timeStart.toISOString() : null,
        time_end: timeEnd ? timeEnd.toISOString() : null,
        init_w: initWeight,
        target_w: targetWeight,
        crr_w: currWeight,
      };

      const response = await axios.put(
        `/api/update_gain_weight/${user_info._id}`,
        payload
      );

      if (response.status === 200) {
        toast.success(t(response.data.message));
        dispatch(setUserInfo(response.data.user));
      }
    } catch (error) {
      console.error("Error updating gain weight target:", error);
      toast.error(t(error.response.data.message || "Error"));
    }
  };

  return (
    <div className=" min-h-screen w-full p-6">
      <div className="w-full h-16 border-b-2 mb-12 ">
        <h1 className=" text-3xl">{t("links.gain_weight")}</h1>
      </div>

      <div className="w-full px-6 mb-6">
        <div className="w-full h-16 border-b-2 ">
          <h2 className=" text-2xl">{t("gain_weight.title")}</h2>
        </div>
      </div>
      {user_info ? (
        <>
          <div className="w-full px-6 mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              {t("gain_weight.description")}
            </label>
            <textarea
              id="description"
              placeholder={t("gain_weight.description")}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value); 
              }}
              className="w-full border-2 border-gray-300 rounded-md p-3 min-h-48 max-h-60"
            ></textarea>
          </div>
          <div className="w-1/2 flex flex-row gap-6 px-6 mb-6">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label={t("gain_weight.time_start")}
                  value={timeStart} 
                  onChange={(newValue) => {
                    setTimeStart(newValue); 
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label={t("gain_weight.time_end")}
                  value={timeEnd} 
                  onChange={(newValue) => {
                    setTimeEnd(newValue); 
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="w-1/2 flex flex-row gap-6 px-6 mb-6">
            <TextField
              type="number"
              label={t("gain_weight.init_weight")}
              value={initWeight}
              onChange={(e) => setInitWeight(e.target.value)}
            />
            <TextField
              type="number"
              label={t("gain_weight.target_end")}
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
            />
          </div>
          <div className="w-1/2 flex flex-row gap-6 px-6 mb-24">
            <TextField
              type="number"
              label={t("gain_weight.curr_weight")}
              value={currWeight}
              onChange={(e) => setCurrWeight(e.target.value)}
            />
            <Button variant="contained" onClick={handleSave}>
              {t("gain_weight.save")}
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
