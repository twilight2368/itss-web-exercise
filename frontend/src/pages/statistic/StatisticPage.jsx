import React from "react";
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

const exerciseImages = [
  { image: Image1, value: "badminton" },
  { image: Image2, value: "basketball" },
  { image: Image3, value: "climbing" },
  { image: Image4, value: "dancing" },
  { image: Image5, value: "jumprope" },
  { image: Image6, value: "running" },
  { image: Image7, value: "soccer" },
  { image: Image8, value: "swimming" },
  { image: Image9, value: "yoga" },
];

export default function StatisticPage() {
  const { t } = useTranslation();

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const pieData = [
    { id: 0, value: 75, label: t("statisticsPage.completed") },
    { id: 1, value: 25, label: t("statisticsPage.not_completed") },
  ];

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
                    { data: pieData, arcLabel: (item) => `${item.value}%` },
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
                      data: pieData,
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
                  value={3}
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
            {exerciseImages.map((image, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={image.image}
                  alt={image.value}
                  className="w-24 h-24 object-contain mb-2"
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" border-2 w-full rounded-md p-8 min-h-60 ">
          <div className=" font-black text-2xl mb-12">
            {t("statisticsPage.review")}
          </div>
        </div>
      </div>
    </div>
  );
}
