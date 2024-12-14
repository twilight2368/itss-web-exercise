import { useState } from "react";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { Button, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="medium"
      >
        <Avatar
          alt="img"
          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png"
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="w-72 p-3  flex flex-col gap-3">
          <div className="w-full flex flex-row items-center pb-2 border-b-2 border-gray-200">
            <div className="w-1/4 flex justify-center items-center">⭐</div>
            <div className="w-3/4 flex flex-col gap-1">
              <div className="w-full pr-2">
                <p className="w-full truncate">Username</p>
              </div>
              <div className="w-full pr-2">
                <p className="w-full truncate">www.mail@gamil.com</p>
              </div>
            </div>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate("/home/profile");
            }}
          >
            {t("user_menu.profile")}
          </Button>
          <Button
            color="gray"
            variant="outlined"
            onClick={() => {
              navigate("/home/settings");
            }}
            s
          >
            {t("user_menu.setting")}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              console.log("====================================");
              console.log("Logout");
              console.log("====================================");
            }}
          >
            {t("user_menu.logout")}
          </Button>
        </div>
      </Menu>
    </div>
  );
}
