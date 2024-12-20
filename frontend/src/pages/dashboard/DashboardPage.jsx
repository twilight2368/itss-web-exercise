import React, { useEffect, useState } from "react";
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
import classNames from "classnames";
import axios from "axios";

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
  const { t, i18n } = useTranslation();
  const [menu, setMenu] = useState();

  const currentHour = new Date().getHours();
  const isLunchTime = currentHour >= 3 && currentHour < 14; //* 3 AM to 2 PM

  const DataOutdatedInDay = (storedDate) => {
    const today = new Date();
    const storedDateObj = new Date(storedDate);
    const diffTime = today - storedDateObj;
    const diffDays = diffTime / (1000 * 3600 * 24);
    return Math.floor(diffDays);
  };

  useEffect(() => {
    const curr_menu = localStorage.getItem("menu-day");
    const last_fetch = localStorage.getItem("menu-day-last-fetch");

    if (curr_menu && last_fetch) {
      //..
      const diff_days = DataOutdatedInDay(JSON.parse(last_fetch));
      const crr_menu_parsed = JSON.parse(curr_menu);

      if (diff_days) {
        axios.get("/api/menu-day").then((response) => {
          if (isLunchTime) {
            setMenu(response.data.data.lunch);
          } else {
            setMenu(response.data.data.dinner);
          }
          localStorage.setItem("menu-day", JSON.stringify(response.data.data));
          localStorage.setItem(
            "menu-day-last-fetch",
            JSON.stringify(new Date().toISOString())
          );
        });
      } else {
        if (isLunchTime) {
          setMenu(crr_menu_parsed.lunch);
        } else {
          setMenu(crr_menu_parsed.dinner);
        }
      }
    } else {
      axios.get("/api/menu-day").then((response) => {
        if (isLunchTime) {
          setMenu(response.data.data.lunch);
        } else {
          setMenu(response.data.data.dinner);
        }
        localStorage.setItem("menu-day", JSON.stringify(response.data.data));
        localStorage.setItem(
          "menu-day-last-fetch",
          JSON.stringify(new Date().toISOString())
        );
      });
    }
  }, []);

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
        <div className="h-[600px] w-1/2 pt-6 flex justify-center items-start">
          <Paper elevation={3} className="w-5/6 h-full aspect-square overflow-y-auto">
            <div
              className={classNames(
                "w-full h-12 flex justify-center items-center border-b-[1px] ",
                isLunchTime
                  ? "border-orange-500 bg-orange-500/25 text-orange-600"
                  : "border-purple-500 bg-purple-500/25 text-purple-600"
              )}
            >
              <h1>
                {isLunchTime
                  ? t("DashboardPage.lunch_title")
                  : t("DashboardPage.dinner_title")}
              </h1>
            </div>
            <div className="w-full pt-3 px-3 h-[500px] gap-0 grid grid-cols-2 grid-rows-2">
              {menu ? (
                <>
                  {menu.map((item, i) => {
                    return (
                      <>
                        <FoodCard item={item} />
                      </>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

function FoodCard({ item }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="w-full h-full p-1 flex justify-center items-center">
      <Paper elevation={1} className="w-full h-full p-2">
        <div className="line-clamp-2 p-1 h-12  font-black">
          {item.name[i18n.language]}
        </div>
        <div className="h-40 w-full">
          <div className="flex h-full flex-col gap-2 justify-center">
            <span className=" before:content-['🔵']">
              <span>{t("foodCard.Calories")}: </span>
              {item.calo} <span>(kcal)</span>
            </span>
            <span className=" before:content-['🟢']">
              <span>{t("foodCard.Protein")}: </span> {item.proteins}{" "}
              <span>(g)</span>
            </span>
            <span className=" before:content-['🟠']">
              <span>{t("foodCard.Fat")}: </span>
              {item.fat} <span>(g)</span>
            </span>
            <span className=" before:content-['🔴']">
              <span>{t("foodCard.Carb")}: </span> {item.carb} <span>(g)</span>
            </span>
          </div>
        </div>
      </Paper>
    </div>
  );
}
