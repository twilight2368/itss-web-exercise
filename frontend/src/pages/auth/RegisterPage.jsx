import { Button, Checkbox, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import Logo from "../../components/logo/Logo";
import ChangeLang from "../../components/locales/ChangeLang";
import Footer from "../../components/footer/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageLogo from "../../assets/logo.png";
export default function RegisterPage() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <div className=" h-24 flex flex-row justify-between px-40 ">
        <div className=" h-full ">
          <Logo />
        </div>
        <div className=" h-full flex flex-row items-center gap-6">
          <div>
            <ChangeLang />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-[600px] mb-20">
        <Card className="min-h-96">
          <CardContent>
            <div className="w-96 min-h-96 flex flex-col gap-6">
              <div className="w-full flex justify-center items-center">
                <img src={ImageLogo} alt="" className=" h-20 aspect-square" />
              </div>
              <h1 className="w-full text-center text-2xl capitalize font-black">
                {t("auth.register")}
              </h1>
              <TextField
                id="outlined-basic"
                label={t("auth.name")}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label={t("auth.email")}
                type="email"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label={t("auth.password")}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label={t("auth.confirm_password")}
                variant="outlined"
              />
              <div>
                <Checkbox /> <span>{t("auth.accept_term")}</span>
              </div>
              <Button variant="contained" size="large">
                {t("auth.register")}
              </Button>
              <div className=" mb-12">
                <span className=" font-bold">{t("auth.sentences2")}</span>
                <Link
                  to="/login"
                  className="mx-2 hover:underline text-blue-400"
                >
                  {t("auth.login")}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
