import { useContext, useState } from "react";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { Button, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../../store/UserSlicer";
import { LoginContext } from "../../context/LoginContext";
export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setIsLogin } = useContext(LoginContext);
  const user_info = useSelector((state) => state.user.user_info);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handlingLogout = () => {
    dispatch(clearUserInfo());
    setIsLogin(false);
    navigate("/");
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
          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
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
                <p className="w-full text-xs truncate">
                  {user_info ? user_info.name : ""}
                </p>
              </div>
              <div className="w-full pr-2">
                <p className="w-full text-xs truncate">
                  {user_info ? user_info.email : ""}
                </p>
              </div>
            </div>
          </div>
          <Button
            color="gray"
            variant="outlined"
            onClick={() => {
              navigate("/home/profile");
              handleClose();
            }}
          >
            {t("user_menu.profile")}
          </Button>
          <Button color="error" variant="contained" onClick={handlingLogout}>
            {t("user_menu.logout")}
          </Button>
        </div>
      </Menu>
    </div>
  );
}
