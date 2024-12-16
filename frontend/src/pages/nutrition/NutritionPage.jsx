import React from "react";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import FoodCardMini from "../../components/food/FoodCardMini";

export default function NutritionPage() {
  const { t, i18n } = useTranslation();

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

  return (
    <div className="min-h-screen p-6">
      <div className="w-full h-16 border-b-2 mb-6">
        <h1 className="text-3xl">{t("links.nutrition")}</h1>
      </div>
      <div className="w-full mb-12">
        <div className="w-2/3 flex flex-row gap-6">
          <span className=" before:content-['🔵']">
            {t("foodCard.Calories")} <span>(kcal)</span>
          </span>
          <span className=" before:content-['🟢']">
            {t("foodCard.Protein")} (g)
          </span>
          <span className=" before:content-['🟠']">
            {" "}
            {t("foodCard.Fat")} (g){" "}
          </span>
          <span className=" before:content-['🔴']">
            {" "}
            {t("foodCard.Carb")} (g){" "}
          </span>
        </div>
      </div>
      <div className="w-full px-12 mb-32">
        <div className="w-full grid grid-cols-4 gap-x-4 gap-y-8">
          {dateArray.map((date, index) => (
            <MenuCard key={index} date={date} />
          ))}
        </div>
      </div>
    </div>
  );
}

const MenuCard = ({ date }) => {
  return (
    <div className="w-full p-2 flex justify-center items-center border-2 border-dashed border-purple-500 bg-purple-50">
      <Paper elevation={3} className="w-full h-96 overflow-y-auto">
        <div className="w-full h-8 flex justify-center items-center border-b-[1px] border-purple-500 bg-purple-500/25 text-purple-600">
          <h6 className="text-xs">{date}</h6>
        </div>
        <div className="p-2 flex flex-col gap-2 ">
          <FoodCardMini />
          <FoodCardMini />
          <FoodCardMini />
          <FoodCardMini />
        </div>
      </Paper>
    </div>
  );
};
