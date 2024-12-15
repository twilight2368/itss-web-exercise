import React from "react";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
export default function NutritionsPage() {
  const { t } = useTranslation();

  return (
    <div className=" min-h-screen p-6">
      <div className="w-full h-16 border-b-2 mb-12">
        <h1 className=" text-3xl">{t("links.nutrition")}</h1>
      </div>
      <div className="w-full px-12 mb-32">
        <div className=" w-full grid grid-cols-4 gap-x-4 gap-y-8">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />

          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </div>
      </div>
    </div>
  );
}

const MenuCard = () => {
  return (
    <>
      <div className="w-full p-2 flex justify-center items-center aspect-square border-2 border-dashed border-purple-500 bg-purple-50">
        <Paper elevation={3} className="w-full aspect-square overflow-y-auto">
          <div className="w-full h-8 flex justify-center items-center border-b-[1px] border-purple-500 bg-purple-500/25 text-purple-600 ">
            <h6 className=" text-xs">yyyy/mm/dd</h6>
          </div>
          <div></div>
        </Paper>
      </div>
    </>
  );
};
