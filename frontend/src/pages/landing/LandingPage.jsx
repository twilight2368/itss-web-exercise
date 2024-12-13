import { useTranslation } from "react-i18next";
import ChangeLang from "../../components/locales/ChangeLang";

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <>
      <ChangeLang />
      <div>{t("welcome")}</div>
      <div>{t("landingPage.title")}</div>
    </>
  );
}
