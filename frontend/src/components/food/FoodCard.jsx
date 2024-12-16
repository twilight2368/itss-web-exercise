import { Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function FoodCard() {
  const { t, i18n } = useTranslation();
  return (
    <div className="w-full h-full p-1 flex justify-center items-center">
      <Paper elevation={1} className="w-full h-full p-2">
        <div className="line-clamp-2 h-12  font-black">
          Lorem ipsum dolor sit amet lor Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptates voluptatem optio nulla possimus,
          praesentium accusamus fugit eaque eos amet repudiandae, ea eligendi
          tenetur cum minus error molestias ducimus magni veritatis.
        </div>
        <div className="h-40 w-full">
          <div className="flex h-full flex-col gap-2 justify-center">
            <span className=" before:content-['🔵']">
              <span>{t("foodCard.Calories")}: </span> <span>(kcal)</span>
            </span>
            <span className=" before:content-['🟢']">
              <span>{t("foodCard.Protein")}: </span> <span>(g)</span>
            </span>
            <span className=" before:content-['🟠']">
              <span>{t("foodCard.Fat")}: </span> <span>(g)</span>
            </span>
            <span className=" before:content-['🔴']">
              <span>{t("foodCard.Carb")}: </span> <span>(g)</span>
            </span>
          </div>
        </div>
      </Paper>
    </div>
  );
}
