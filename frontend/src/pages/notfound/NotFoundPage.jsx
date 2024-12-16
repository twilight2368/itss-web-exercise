import React from "react";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-[600px] flex flex-row gap-6 font-black text-4xl justify-center items-center">
      <div className="border-r-4 border-black px-6">404</div>
      <div>{t("NotFoundPage")}</div>
    </div>
  );
}
