import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setUserInfo } from "../../store/UserSlicer";
import { toast } from "react-toastify";
export default function ProfilePage() {
  const { t } = useTranslation();
  const user_info = useSelector((state) => state.user.user_info);
  const jwt = useSelector((state) => state.user.token);
  const user_id = useSelector((state) => state.user.user_id);
  const dispatch = useDispatch();

  // Local state for edit mode and form values
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: user_info?.name || "",
    email: user_info?.email || "",
    date_of_birth: user_info?.date_of_birth?.split("T")[0] || "",
    phone: user_info?.phone || "",
    position: user_info?.position || "",
    place_of_work: user_info?.place_of_work || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await axios
        .put(`/api/change-profile/${user_id}`, formValues, {
          headers: {
            Authorization: `Bear ${jwt}`,
          },
        })
        .then((response) => {
          dispatch(setUserInfo(response.data.user));
          toast.success(t(response.data.message));
          setIsEditing(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error(t(error.response.data.message || "Error"));
        });
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleCancel = () => {
    // Reset form values to original user info
    setFormValues({
      name: user_info?.name || "",
      email: user_info?.email || "",
      date_of_birth: user_info?.date_of_birth?.split("T")[0] || "",
      phone: user_info?.phone || "",
      position: user_info?.position || "",
      place_of_work: user_info?.place_of_work || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="w-full h-16 border-b-2">
        <h1 className="text-3xl">{t("profilePage.header")}</h1>
      </div>
      {user_info ? (
        <>
          <div className="w-full p-12">
            <div className="w-full flex flex-row gap-0">
              {/* Left section with image */}
              <div className="w-1/2 flex flex-col gap-6 justify-center items-start">
                <div className="h-[300px] aspect-square">
                  <img
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                    alt=""
                  />
                </div>
                <div className="relative w-[300px] h-14 hover:cursor-pointer">
                  {isEditing ? (
                    <>
                      <button
                        disabled
                        className="p-4 w-full h-full font-bold shadow-md bg-blue-400 shadow-blue-300 rounded-md"
                      >
                        {t("profilePage.upload_image")}
                      </button>
                      <input
                        type="file"
                        className="absolute top-0 left-0 h-full w-full opacity-0 hover:cursor-pointer"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* Right section with form */}
              <div className="w-1/2 pr-24 flex flex-col gap-4">
                <TextField
                  value={formValues.name}
                  name="name"
                  onChange={handleInputChange}
                  label={t("profilePage.name")}
                  type="text"
                  disabled={!isEditing}
                />
                <TextField
                  value={formValues.email}
                  name="email"
                  onChange={handleInputChange}
                  label={t("profilePage.email")}
                  type="text"
                  disabled={!isEditing}
                />
                <TextField
                  value={formValues.date_of_birth}
                  name="date_of_birth"
                  onChange={handleInputChange}
                  label={t("profilePage.birthday")}
                  type="date"
                  disabled={!isEditing}
                />
                <TextField
                  value={formValues.phone}
                  name="phone"
                  onChange={handleInputChange}
                  label={t("profilePage.phone_number")}
                  type="text"
                  disabled={!isEditing}
                />
                <TextField
                  value={formValues.position}
                  name="position"
                  onChange={handleInputChange}
                  label={t("profilePage.position")}
                  type="text"
                  disabled={!isEditing}
                />
                <TextField
                  value={formValues.place_of_work}
                  name="place_of_work"
                  onChange={handleInputChange}
                  label={t("profilePage.place_of_work")}
                  type="text"
                  disabled={!isEditing}
                />

                <div>
                  {isEditing ? (
                    <div className="flex flex-row gap-3">
                      <Button variant="contained" onClick={handleSave}>
                        {t("profilePage.save")}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCancel}
                      >
                        {t("profilePage.buttonChangeCancel")}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="contained" onClick={handleEditToggle}>
                      {t("profilePage.buttonChange")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>{t("profilePage.no_user_info")}</div>
      )}
    </div>
  );
}
