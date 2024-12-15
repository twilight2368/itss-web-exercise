import { useState } from "react";
import Popover from "@mui/material/Popover";
import { LuBell } from "react-icons/lu";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import NotificationItem from "./NotificationItem";
import { useTranslation } from "react-i18next";
export default function NotificationPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [invisible, setInvisible] = useState(false);
  const { t } = useTranslation();
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
        <div className=" max-h-96 w-96 overflow-x-hidden overflow-y-auto custom-scrollbar">
          <div className="w-full p-3 flex flex-col gap-4">
            <NotificationItem
              type="today"
              message={t("notification.exerciseScheduled")}
            />
            <NotificationItem
              type="done"
              message={t("notification.exerciseDone")}
            />
            <NotificationItem
              type="missed"
              message={t("notification.exerciseMissed")}
            />
          </div>
        </div>
      </Popover>
    </div>
  );
}
