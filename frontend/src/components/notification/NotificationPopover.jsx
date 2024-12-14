import { useState } from "react";
import Popover from "@mui/material/Popover";
import { LuBell } from "react-icons/lu";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
export default function NotificationPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [invisible, setInvisible] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setInvisible(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Badge color="primary" variant="dot" invisible={invisible}>
        <IconButton
          aria-describedby={id}
          variant="text"
          size="medium"
          onClick={handleClick}
        >
          <LuBell />
        </IconButton>
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div className=" h-96 w-96 overflow-x-hidden overflow-y-auto custom-scrollbar">
          <div className="w-full min-h-screen"></div>
        </div>
      </Popover>
    </div>
  );
}
