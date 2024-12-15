import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image1 from "../../assets/exercise/badminton.svg";
import Image2 from "../../assets/exercise/basketball.svg";
import Image3 from "../../assets/exercise/climbing.svg";
import Image4 from "../../assets/exercise/dancing.svg";
import Image5 from "../../assets/exercise/jump-rope.svg";
import Image6 from "../../assets/exercise/running.svg";
import Image7 from "../../assets/exercise/soccer.svg";
import Image8 from "../../assets/exercise/swimming.svg";
import Image9 from "../../assets/exercise/yoga.svg";
import { TextField } from "@mui/material";
import Slider from "@mui/material/Slider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid gray",
  borderRadius: "3px",
  boxShadow: 24,
  p: 2,
};

const exerciseImages = [
  {
    image: Image1,
    title: "DashboardPage.badminton",
    value: "badminton",
  },
  {
    image: Image2,
    title: "DashboardPage.basketball",
    value: "basketball",
  },
  {
    image: Image3,
    title: "DashboardPage.climbing",
    value: "climbing",
  },
  {
    image: Image4,
    title: "DashboardPage.dancing",
    value: "dancing",
  },
  {
    image: Image5,
    title: "DashboardPage.jumprope",
    value: "jumprope",
  },
  {
    image: Image6,
    title: "DashboardPage.running",
    value: "running",
  },
  {
    image: Image7,
    title: "DashboardPage.soccer",
    value: "soccer",
  },
  {
    image: Image8,
    title: "DashboardPage.swimming",
    value: "swimming",
  },
  {
    image: Image9,
    title: "DashboardPage.yoga",
    value: "yoga",
  },
];

export default function MakeExerciseModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        {t("schedulePage.create_exercise")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-[600px] max-h-[650px] overflow-y-auto ">
            <div className="w-full mb-6">
              <h3 className=" text-2xl font-black">
                {t("modalExercise.header")}
              </h3>
            </div>
            <div className="w-full mb-6">
              <h4 className=" text-xl font-black">
                {t("modalExercise.title")}
              </h4>
            </div>
            <div className="w-full min-h-96 mb-6">
              <div className="w-full grid grid-cols-3 gap-6 px-6">
                {exerciseImages.map((item, i) => {
                  return (
                    <>
                      <ButtonExercise
                        key={i}
                        image={item.image}
                        name={t(item.title)}
                        value={item.value}
                        crr_value={value}
                        setValue={setValue}
                      />
                    </>
                  );
                })}
              </div>
            </div>
            <div className=" w-full h-12 mb-9 px-3">
              <div className="flex flex-row items-center justify-between">
                <div>{t("modalExercise.start_time")}</div>
                <TextField type="time" className="w-1/3" />
              </div>
            </div>
            <div className=" w-full h-24 px-3">
              <div className=" mb-3">{t("modalExercise.durations_time")}</div>
              <div className="w-full flex flex-row justify-between px-6">
                <div className=" text-sm text-center w-1/12 pt-1">20'</div>
                <div className=" w-10/12 px-3">
                  <Slider defaultValue={20} step={10} marks min={20} max={90} />
                </div>
                <div className=" text-sm text-center w-1/12 pt-1">90'</div>
              </div>
            </div>
            <div className="w-full my-6 flex justify-center items-center">
              <Button variant="contained" color="warning">
                {t("modalExercise.save")}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const ButtonExercise = ({ image, name, value, setValue, crr_value }) => {
  return (
    <>
      <Button
        variant={value === crr_value ? "contained" : "text"}
        className="w-full aspect-square"
        onClick={() => {
          setValue(value);
        }}
      >
        <div className="w-full flex flex-col gap-1">
          <div className="w-full h-2/3 flex justify-center items-center p-3">
            <img src={image} alt="" className="h-20 aspect-square" />
          </div>
          <div className="w-full h-1/3">
            <span className=" text-[12px] ">{name}</span>
          </div>
        </div>
      </Button>
    </>
  );
};
