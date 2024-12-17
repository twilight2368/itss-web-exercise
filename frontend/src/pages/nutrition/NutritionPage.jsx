import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import axios from "axios"; // Import axios to make API requests

export default function NutritionPage() {
  const { t, i18n } = useTranslation();
  const [menuWeek, setMenuWeek] = useState();
  const [loading, setLoading] = useState(false);

  const DataOutdatedInDay = (storedDate) => {
    const today = new Date();
    const storedDateObj = new Date(storedDate);
    const diffTime = today - storedDateObj;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return Math.floor(diffDays);
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const isJapanese = i18n.language === "ja";

    for (let i = 0; i < 8; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const formattedDate = isJapanese
        ? nextDate.toISOString().split("T")[0]
        : nextDate.toLocaleDateString("vi-VN");
      dates.push(formattedDate);
    }

    return dates;
  };

  const dateArray = generateDates();

  useEffect(() => {
    setLoading(true);
    const curr_menu = localStorage.getItem("menu-week");
    const last_fetch = localStorage.getItem("menu-week-last-fetch");

    if (curr_menu && last_fetch) {
      const diff_days = Math.min(DataOutdatedInDay(JSON.parse(last_fetch)), 8);
      const crr_menu_parsed = JSON.parse(curr_menu);

      if (diff_days) {
        axios
          .get("/api/menu-week", {
            params: { limit: diff_days },
          })
          .then((response) => {
            const new_menu = [
              ...crr_menu_parsed.slice(diff_days, 8),
              ...response.data.data,
            ];

            localStorage.setItem("menu-week", JSON.stringify(new_menu));
            localStorage.setItem(
              "menu-week-last-fetch",
              JSON.stringify(new Date().toISOString())
            );

            setMenuWeek(new_menu);
            setLoading(false);
          })
          .catch((error) => {
            setMenuWeek(crr_menu_parsed);
            setLoading(false);
          });
      } else {
        setMenuWeek(crr_menu_parsed);
        setLoading(false);
      }
    } else {
      axios
        .get("/api/menu-week", {
          params: { limit: 8 },
        })
        .then((response) => {
          setMenuWeek(response.data.data);
          localStorage.setItem("menu-week", JSON.stringify(response.data.data));
          localStorage.setItem(
            "menu-week-last-fetch",
            JSON.stringify(new Date().toISOString())
          );
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="w-full h-16 border-b-2 mb-6">
        <h1 className="text-3xl">{t("links.nutrition")}</h1>
      </div>
      <div className="w-full mb-12">
        <div className="w-2/3 flex flex-row gap-6">
          <span className="before:content-['🔵']">
            {t("foodCard.Calories")} <span>(kcal)</span>
          </span>
          <span className="before:content-['🟢']">
            {t("foodCard.Protein")} (g)
          </span>
          <span className="before:content-['🟠']">{t("foodCard.Fat")} (g)</span>
          <span className="before:content-['🔴']">
            {t("foodCard.Carb")} (g)
          </span>
        </div>
      </div>
      <div className="w-full px-12 mb-32">
        <div className="w-full grid grid-cols-4 gap-x-4 gap-y-8">
          {menuWeek && !loading ? (
            <>
              {menuWeek.map((menu, index) => {
                return (
                  <>
                    <MenuCard key={index} date={dateArray[index]} menu={menu} />
                  </>
                );
              })}
            </>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </div>
  );
}

function MenuCard({ date, menu }) {
  return (
    <div className="w-full p-2 flex justify-center items-center border-2 border-dashed border-purple-500 bg-purple-50">
      <Paper elevation={3} className="w-full h-96 overflow-y-auto">
        <div className="w-full h-8 flex justify-center items-center border-b-[1px] border-purple-500 bg-purple-500/25 text-purple-600">
          <h6 className="text-xs">{date ? date : ""}</h6>
        </div>
        <div className="p-2 flex flex-col gap-2">
          {menu ? (
            <>
              {menu.map((item) => {
                return (
                  <>
                    <FoodCardMini item={item} />
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
  );
}

function FoodCardMini({ item }) {
  const { i18n } = useTranslation();
  return (
    <div className="w-full p-2 shadow-sm shadow-gray-400">
      <div className="line-clamp-2 text-sm h-10 font-black">
        {item.name[i18n.language]}
      </div>
      <div className="grid grid-cols-4 text-xs gap-0">
        <span className="before:content-['🔵']">{item.calo} </span>
        <span className="before:content-['🟢']">{item.proteins}</span>
        <span className="before:content-['🟠']">{item.fat}</span>
        <span className="before:content-['🔴']">{item.carb}</span>
      </div>
    </div>
  );
}
