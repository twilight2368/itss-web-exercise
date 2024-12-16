import React from "react";
import { useTranslation } from "react-i18next";
import Image1 from "../../assets/exercise/badminton.svg";
import Image2 from "../../assets/exercise/basketball.svg";
import Image3 from "../../assets/exercise/climbing.svg";
import Image4 from "../../assets/exercise/dancing.svg";
import Image5 from "../../assets/exercise/jump-rope.svg";
import Image6 from "../../assets/exercise/running.svg";
import Image7 from "../../assets/exercise/soccer.svg";
import Image8 from "../../assets/exercise/swimming.svg";
import Image9 from "../../assets/exercise/yoga.svg";
import Paper from "@mui/material/Paper";
import ModalSport from "../../components/modals/ModalSport";

const exerciseImages = [
  {
    image: Image1,
    title: "DashboardPage.badminton",
    description: "DashboardPage.descriptions.badminton",
  },
  {
    image: Image2,
    title: "DashboardPage.basketball",
    description: "DashboardPage.descriptions.basketball",
  },
  {
    image: Image3,
    title: "DashboardPage.climbing",
    description: "DashboardPage.descriptions.climbing",
  },
  {
    image: Image4,
    title: "DashboardPage.dancing",
    description: "DashboardPage.descriptions.dancing",
  },
  {
    image: Image5,
    title: "DashboardPage.jumprope",
    description: "DashboardPage.descriptions.jumprope",
  },
  {
    image: Image6,
    title: "DashboardPage.running",
    description: "DashboardPage.descriptions.running",
  },
  {
    image: Image7,
    title: "DashboardPage.soccer",
    description: "DashboardPage.descriptions.soccer",
  },
  {
    image: Image8,
    title: "DashboardPage.swimming",
    description: "DashboardPage.descriptions.swimming",
  },
  {
    image: Image9,
    title: "DashboardPage.yoga",
    description: "DashboardPage.descriptions.yoga",
  },
];

export default function DashboardPage() {
  const { t } = useTranslation();

  const currentHour = new Date().getHours();
  const isLunchTime = currentHour >= 3 && currentHour < 14; //* 3 AM to 2 PM

  return (
    <div className=" min-h-screen p-6">
      <div className="w-full h-16 border-b-2 ">
        <h1 className=" text-3xl">{t("DashboardPage.header")}</h1>
      </div>
      <div className="w-full flex flex-row gap-0 my-12 ">
        <div className="w-1/2 p-3 grid grid-cols-3 gap-6 ">
          {exerciseImages.map((item, i) => {
            return (
              <>
                <div key={i} className="w-full aspect-square">
                  <ModalSport
                    image={item.image}
                    title={t(item.title)}
                    description={t(item.description)}
                    link={t("DashboardPage.links")}
                    close={t("DashboardPage.close")}
                  />
                </div>
              </>
            );
          })}
        </div>
        <div className=" w-1/2 pt-6 flex justify-center items-start">
          <Paper elevation={3} className="w-5/6 aspect-square overflow-y-auto">
            <div className="w-full h-12 flex justify-center items-center border-b-[1px] border-purple-500 bg-purple-500/25 text-purple-600 ">
              <h1>
                {isLunchTime
                  ? t("DashboardPage.lunch_title")
                  : t("DashboardPage.dinner_title")}
              </h1>
            </div>
            <div></div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
