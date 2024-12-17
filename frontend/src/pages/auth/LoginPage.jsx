import React, { useContext, useState } from "react";
import { Button, Checkbox, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import Logo from "../../components/logo/Logo";
import ChangeLang from "../../components/locales/ChangeLang";
import Footer from "../../components/footer/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageLogo from "../../assets/logo.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserId, setUserInfo } from "../../store/UserSlicer";
import { toast } from "react-toastify";
import { LoginContext } from "../../context/LoginContext";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsLogin } = useContext(LoginContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert(t(""));
      return;
    }
    axios
      .post("/api/auth/login", {
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        dispatch(setUserId(response.data.user._id));
        dispatch(setUserInfo(response.data.user));
        dispatch(setToken(response.data.jwt));
        setIsLogin(true);
        toast.success(response.data.message);
        navigate("/home");
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  return (
    <div className="w-full">
      <div className="h-24 flex flex-row justify-between px-40">
        <div className="h-full">
          <Logo />
        </div>
        <div className="h-full flex flex-row items-center gap-6">
          <ChangeLang />
        </div>
      </div>
      <div className="flex justify-center items-center min-h-[600px] mb-20">
        <Card className="min-h-96">
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="w-96 min-h-96 flex flex-col gap-6"
            >
              <div className="w-full flex justify-center items-center">
                <img src={ImageLogo} alt="" className="h-20 aspect-square" />
              </div>
              <h1 className="w-full text-center text-2xl capitalize font-black">
                {t("auth.login")}
              </h1>
              <TextField
                id="email"
                name="email"
                label={t("auth.email")}
                variant="outlined"
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                id="password"
                name="password"
                label={t("auth.password")}
                type="password"
                variant="outlined"
                value={form.password}
                onChange={handleChange}
              />
              <div>
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <span>{t("auth.remember_me")}</span>
              </div>
              <Button type="submit" variant="contained" size="large">
                {t("auth.login")}
              </Button>
              <div className="mb-12">
                <span className="font-bold">{t("auth.sentences1")}</span>
                <Link
                  to="/register"
                  className="mx-2 hover:underline text-blue-400"
                >
                  {t("auth.register")}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
