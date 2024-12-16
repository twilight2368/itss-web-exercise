import Logo from "../logo/Logo";
import ChangeLang from "../locales/ChangeLang";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function LandingHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className=" h-24 flex flex-row justify-between px-40 ">
      <div className=" h-full ">
        <Logo />
      </div>
      <div className=" h-full flex flex-row items-center gap-6">
        <div>
          <ChangeLang />
        </div>
        <div>
          <Button
            variant="contained"
            className=" w-32"
            onClick={() => {
              navigate("/login");
            }}
          >
            {t("login")}
          </Button>
        </div>
        <div>
          <Button
            variant="outlined"
            color="black"
            className=" w-32"
            onClick={() => {
              navigate("/register");
            }}
          >
            {t("register")}
          </Button>
        </div>
      </div>
    </div>
  );
}
