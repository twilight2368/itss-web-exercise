import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { PieChart } from "@mui/x-charts/PieChart";
import { Rating } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import images
import Image1 from "../../assets/exercise/badminton.svg";
import Image2 from "../../assets/exercise/basketball.svg";
import Image3 from "../../assets/exercise/climbing.svg";
import Image4 from "../../assets/exercise/dancing.svg";
import Image5 from "../../assets/exercise/jump-rope.svg";
import Image6 from "../../assets/exercise/running.svg";
import Image7 from "../../assets/exercise/soccer.svg";
import Image8 from "../../assets/exercise/swimming.svg";
import Image9 from "../../assets/exercise/yoga.svg";
import { useSelector } from "react-redux";
import {
  CalculatePercentageEvaluate,
  CalculatePercentageWeight,
} from "../../utils/CalculatePercentage";
import axios from "axios";

const exerciseImages = {
  badminton: Image1,
  basketball: Image2,
  climbing: Image3,
  dancing: Image4,
  jumprope: Image5,
  running: Image6,
  soccer: Image7,
  swimming: Image8,
  yoga: Image9,
};

export default function StatisticPage() {
  const { t } = useTranslation();
  const user_info = useSelector((state) => state.user.user_info);
  const [history, setHistory] = useState();
  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const pieData1 = [
    {
      id: 0,
      value: CalculatePercentageWeight(
        user_info.target.loss_weight.crr_w,
        user_info.target.loss_weight.target_w,
        user_info.target.loss_weight.init_w,
        0
      ),
      label: t("statisticsPage.completed"),
    },
    {
      id: 1,
      value:
        100 -
        CalculatePercentageWeight(
          user_info.target.loss_weight.crr_w,
          user_info.target.loss_weight.target_w,
          user_info.target.loss_weight.init_w,
          0
        ),
      label: t("statisticsPage.not_completed"),
    },
  ];

  const pieData2 = [
    {
      id: 0,
      value: CalculatePercentageWeight(
        user_info.target.gain_weight.crr_w,
        user_info.target.gain_weight.target_w,
        user_info.target.gain_weight.init_w,
        1
      ),
      label: t("statisticsPage.completed"),
    },
    {
      id: 1,
      value:
        100 -
        CalculatePercentageWeight(
          user_info.target.gain_weight.crr_w,
          user_info.target.gain_weight.target_w,
          user_info.target.gain_weight.init_w,
          1
        ),
      label: t("statisticsPage.not_completed"),
    },
  ];

  const user_id = useSelector((state) => state.user.user_id);

  useEffect(() => {
    if (user_id !== "") {
      axios.get(`/api/schedule-history/${user_id}`).then((response) => {
        // console.log(response.data);
        console.log(response.data.schedules);

        setHistory(response.data.schedules);
      }); // Adjust to your API endpoint
    }
  }, [t]);
  return (
    <div className="min-h-screen p-6">
      <div className="w-full h-16 border-b-2 mb-24">
        <h1 className="text-3xl">{t("links.statistics")}</h1>
      </div>

      <div className="mb-24">
        <div className="mb-8 px-12">
          <Slider {...carouselSettings}>
            <div>
              <div className="w-full flex flex-col gap-12 justify-center items-center">
                {" "}
                <PieChart
                  series={[
                    { data: pieData1, arcLabel: (item) => `${item.value}%` },
                  ]}
                  width={800}
                  height={360}
                />
                <div className=" text-xl font-black">
                  {t("statisticsPage.loss_weight")}
                </div>
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col gap-12 justify-center items-center">
                <PieChart
                  colors={["#ba68c8", "slateblue"]}
                  series={[
                    {
                      data: pieData2,
                      arcLabel: (item) => `${item.value}%`,
                    },
                  ]}
                  width={800}
                  height={360}
                />
                <div className=" text-xl font-black">
                  {t("statisticsPage.gain_weight")}
                </div>
              </div>
            </div>
            <div>
              <div className="w-full h-[300px] flex flex-col gap-12 justify-center items-center">
                <Rating
                  name="disabled"
                  value={user_info.target.health_improve.evaluate}
                  disabled
                  sx={{
                    fontSize: "4rem",
                    gap: "40px",
                  }}
                />{" "}
                <div className=" text-xl font-black">
                  {t("statisticsPage.health_improve")}
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className=" px-12 ">
        <div className=" border-2 rounded-md p-8 mb-12">
          <div className=" font-black text-2xl mb-12">
            {t("statisticsPage.exercise_history")}
          </div>
          <div className="px-6 grid grid-cols-9 gap-0">
            {history ? (
              <>
                {history.map((item) => {
                  return (
                    <>
                      <div className="w-full h-full flex justify-center items-center">
                        <img
                          src={exerciseImages[item.value]}
                          alt="image"
                          className="w-24 aspect-square"
                        />
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className=" border-2 w-full rounded-md p-8 min-h-60 ">
          <div className=" font-black text-2xl mb-12">
            {t("statisticsPage.review")}
          </div>
          <div className="w-full "></div>
        </div>
      </div>
    </div>
  );
}
