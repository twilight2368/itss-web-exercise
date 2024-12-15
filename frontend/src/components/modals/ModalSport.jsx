import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalSport({ image, title, description, link, close }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={handleOpen} className=" h-full aspect-square">
        <div className="w-full h-full flex flex-col gap-2">
          <div className=" flex justify-center items-center p-3 h-3/4">
            <img src={image} alt="" className=" h-full aspect-square" />
          </div>
          <div className=" h-1/4 flex justify-center items-center ">
            {title}
          </div>
        </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span className="font-black">{title}</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <div className="w-full pt-12 flex justify-center flex-col gap-3 items-center">
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/home/schedule");
              }}
            >
              {link}
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              {close}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
