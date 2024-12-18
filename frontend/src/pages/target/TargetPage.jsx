import { Card, CardContent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserInfo } from "../../store/UserSlicer";
import { toast } from "react-toastify";
import {
  CalculatePercentageEvaluate,
  CalculatePercentageWeight,
} from "../../utils/CalculatePercentage";
export default function TargetPage() {
  const { t } = useTranslation();
  const user_info = useSelector((state) => state.user.user_info);

  return (
    <div className="w-full p-6 min-h-screen">
      <div className="w-full h-16 border-b-2 ">
        <h1 className=" text-3xl">{t("links.target")}</h1>
      </div>
      <div className="w-full px-20 pt-24">
        <div className=" h-96 w-full grid grid-cols-3 gap-3">
          {user_info ? (
            <>
              <div className="w-full h-60">
                <TargetCard
                  isActive={user_info.target.loss_weight.isActive}
                  see_detail={t("targetCard.see_detail")}
                  card_name={t("targetCard.weight_loss")}
                  to="loss_weight"
                  apiEndpoint={`/api/update_lost_weight_active/${user_info._id}`}
                  num={CalculatePercentageWeight(
                    user_info.target.loss_weight.crr_w,
                    user_info.target.loss_weight.target_w,
                    user_info.target.loss_weight.init_w,
                    0
                  )}
                />
              </div>
              <div className="w-full h-60">
                <TargetCard
                  isActive={user_info.target.gain_weight.isActive}
                  see_detail={t("targetCard.see_detail")}
                  card_name={t("targetCard.weight_gain")}
                  to="gain_weight"
                  apiEndpoint={`/api/update_gain_weight_active/${user_info._id}`}
                  num={CalculatePercentageWeight(
                    user_info.target.gain_weight.crr_w,
                    user_info.target.gain_weight.target_w,
                    user_info.target.gain_weight.init_w,
                    1
                  )}
                />
              </div>
              <div className="w-full h-60">
                <TargetCard
                  isActive={user_info.target.health_improve.isActive}
                  see_detail={t("targetCard.see_detail")}
                  card_name={t("targetCard.health_improvement")}
                  to="health_improve"
                  apiEndpoint={`/api/update_health_active/${user_info._id}`}
                  num={CalculatePercentageEvaluate(
                    user_info.target.health_improve.evaluate,
                    5
                  )}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

const TargetCard = ({
  num = 0,
  isActive,
  see_detail,
  card_name,
  to,
  apiEndpoint,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle setting the target as active
  const updateIsActive = async () => {
    try {
      const response = await axios.put(apiEndpoint);

      dispatch(setUserInfo(response.data.user));

      toast.success(t("targetCard.success_message"));
    } catch (error) {
      console.error("Error updating target:", error);
      toast.error(t("targetCard.error_message"));
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "20px",
          padding: 0,
        }}
        className="w-full h-full"
      >
        <CardContent
          sx={{
            padding: 0,
          }}
        >
          <div className="h-12 px-6 bg-gray-100 w-full border-b-[1px] border-gray-300 flex flex-row justify-between items-center ">
            <div>
              <span className="font-bold">{card_name}</span>
            </div>
            <div>
              <button
                className={classNames(
                  "rounded-full w-fit px-3 py-1 shadow duration-100 hover:scale-95 focus:scale-95",
                  isActive
                    ? "bg-green-300 shadow-green-500"
                    : "bg-gray-400 shadow-gray-600"
                )}
                onClick={() => {
                  if (!isActive) {
                    updateIsActive();
                  }
                }}
              >
                {isActive ? t("targetCard.active") : t("targetCard.setActive")}
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-center h-32">
            <div className=" font-black">{num}%</div>
            <div className="w-full px-12">
              <Slider
                size="small"
                defaultValue={num}
                aria-label="Small"
                valueLabelDisplay="auto"
                disabled
                sx={{
                  "&.Mui-disabled": {
                    color: "#1976d2",
                  },
                  "& .MuiSlider-track": {
                    height: 8,
                  },
                  "& .MuiSlider-rail": {
                    height: 8,
                  },
                  "& .MuiSlider-thumb": {
                    width: 0,
                    height: 0,
                  },
                }}
              />
            </div>
          </div>
          <div className="h-12 w-full flex justify-center items-center">
            <button
              className="rounded-full w-fit bg-blue-500 shadow-blue-800 px-3 py-1 shadow duration-100 hover:scale-95 focus:scale-95"
              onClick={() => {
                navigate(to);
              }}
            >
              {see_detail}
            </button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
