import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoPlayOutline } from "react-icons/io5";

export default function DemoWatchModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();
  return (
    <div>
      <Button
        variant="outlined"
        size="large"
        className="w-48"
        color="black"
        onClick={handleOpen}
      >
        <IoPlayOutline />
        {t("landingPage.button2")}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute top-1/2 right-1/2 w-[1000px] aspect-video translate-x-1/2 -translate-y-1/2 ">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
}
