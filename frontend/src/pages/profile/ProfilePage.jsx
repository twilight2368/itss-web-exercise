import { Button, Input, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation();
  return (
    <div className=" p-6 min-h-screen ">
      <div className="w-full h-16 border-b-2 ">
        <h1 className=" text-3xl">{t("profilePage.header")}</h1>
      </div>
      <div className="w-full p-12">
        <div className="w-full flex flex-row gap-0">
          <div className="w-1/2 flex justify-center items-start pt-12">
            <img src="https://placehold.jp/300x300.png" alt="" />
          </div>
          <div className="w-1/2 pr-24 flex flex-col gap-4">
            <TextField
              defaultValue={"2024-01-01"}
              label={t("profilePage.name")}
              type="text"
              disabled
            />
            <TextField
              defaultValue={"2024-01-01"}
              label={t("profilePage.email")}
              type="text"
              disabled
            />
            <TextField
              defaultValue={"2024-01-01"}
              label={t("profilePage.birthday")}
              type="date"
              disabled
            />
            <TextField
              defaultValue={"2024-01-01"}
              label={t("profilePage.phone_number")}
              type="text"
              disabled
            />
            <TextField
              defaultValue={"2024-01-01"}
              label={t("profilePage.position")}
              type="text"
              disabled
            />
            <TextField
              defaultValue={"2024-01-01"}
              label={t("profilePage.place_of_work")}
              type="text"
              disabled
            />
            <Input type="file" disabled />
            <div>
              {!true ? (
                <>
                  <div className="">
                    <Button variant="contained">
                      {t("profilePage.buttonChange")}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className=" flex flex-row gap-3">
                    <Button variant="contained">
                      {t("profilePage.buttonChange")}
                    </Button>
                    <Button variant="outlined" color="error">
                      {t("profilePage.buttonChangeCancel")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
