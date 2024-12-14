import { useTranslation } from "react-i18next";

import LandingHeader from "../../components/header/LandingHeader";
import ColorfulBackground from "./ColorfulBackground";
import { Button } from "@mui/material";
import Image1 from "../../assets/exercise/badminton.svg";
import Image2 from "../../assets/exercise/basketball.svg";
import Image3 from "../../assets/exercise/climbing.svg";
import Image4 from "../../assets/exercise/dancing.svg";
import Image5 from "../../assets/exercise/jump-rope.svg";
import Image6 from "../../assets/exercise/running.svg";
import Image7 from "../../assets/exercise/soccer.svg";
import Image8 from "../../assets/exercise/swimming.svg";
import Image9 from "../../assets/exercise/yoga.svg";
import Footer from "../../components/footer/Footer";
import DemoWatchModal from "./DemoWatchModal";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const exerciseImages = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
  ];

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="w-full">
          <LandingHeader />
        </div>
        <div className="w-full min-h-[600px] mb-32 pt-8 flex flex-row gap-0">
          <div className="w-1/2 flex flex-col justify-center items-center gap-6">
            <div className=" text-xl font-bold">
              {t("landingPage.sentences1")}
            </div>
            <div className=" font-black text-6xl w-96 text-center">
              <div className="mb-2">No regret with</div>
              <div className="w-2/3 mx-auto">
                <ColorfulBackground text={"Regress"} />
              </div>
            </div>
            <div className=" w-full flex justify-center items-center gap-6">
              <Button
                variant="contained"
                size="large"
                className="w-32"
                onClick={() => {
                  navigate("/register");
                }}
              >
                {t("landingPage.button1")}
              </Button>
              <DemoWatchModal />
            </div>
          </div>
          <div className="w-1/2 relative flex justify-center items-center">
            <div className="relative grid grid-cols-3 gap-12">
              {exerciseImages.map((image) => {
                return (
                  <>
                    <ItemDisplay image={image} />
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}

const ItemDisplay = ({ image }) => {
  return (
    <div className="w-32 h-32 relative group">
      <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-100 rounded-full blur-xl transition-opacity duration-300"></div>
      <img
        src={image}
        alt="img"
        className="w-full h-full aspect-square object-contain relative z-10"
      />
    </div>
  );
};
