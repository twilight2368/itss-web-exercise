import { useTranslation } from "react-i18next";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useEffect } from "react";

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "white",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url("/japan.svg")`,
        backgroundSize: "cover",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundImage: `url('/vietnam.svg')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
  },
}));

export default function ChangeLang() {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "vi"); // Use detected language or fallback

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = () => {
    const newLanguage = language === "ja" ? "vi" : "ja";
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <div>
      <FormControlLabel
        label={t("language")}
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={language === "ja"} // Reflect state in switch
            onChange={handleLanguageChange}
          />
        }
      />
    </div>
  );
}
