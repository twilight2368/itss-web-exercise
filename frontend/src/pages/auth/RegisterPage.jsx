import { Button, Checkbox, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom"; // Ensure you're using react-router-dom for Link and navigation
import { useContext, useState } from "react"; // Import useState to manage form state
import Logo from "../../components/logo/Logo";
import ChangeLang from "../../components/locales/ChangeLang";
import Footer from "../../components/footer/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageLogo from "../../assets/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { LoginContext } from "../../context/LoginContext";
import { setToken, setUserId, setUserInfo } from "../../store/UserSlicer";
import { useDispatch } from "react-redux";
export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsLogin } = useContext(LoginContext);
  const dispatch = useDispatch();
  function checkPassword(password) {
    const maxLength = 64;
    const minLength = 8;

    // Check if password length is within range
    if (password.length < minLength || password.length > maxLength) {
      return false;
    }

    // Check if password contains at least one uppercase letter, one lowercase letter, and one number
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return false;
    }

    return true;
  }

  function checkEmail(email) {
    const maxLength = 64;

    if (email.length > maxLength) {
      return false;
    }

    return true;
  }
  // State to manage the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error(t("auth.fill_required_fields"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(t("auth.password_mismatch"));
      return;
    }

    if (!formData.acceptTerms) {
      toast.error(t("auth.accept_terms"));
      return;
    }
    if (!checkEmail(formData.email)) {
      toast.error(t("auth.email_format"));
      return;
    }

    if (!checkPassword(formData.password)) {
      toast.error(t("auth.password_format"));
      return;
    }

    axios
      .post(
        "/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(setUserId(response.data.user._id));
        dispatch(setUserInfo(response.data.user));
        dispatch(setToken(response.data.jwt));
        setIsLogin(true);
        toast.success(t(response.data.message));
        navigate("/home");
      })
      .catch((error) => {
       console.error(error)
       toast.error(t(error.response.data.message ? error.response.data.message : "Error"));
      });
  };

  return (
    <div className="w-full">
      <div className="h-24 flex flex-row justify-between px-40">
        <div className="h-full">
          <Logo />
        </div>
        <div className="h-full flex flex-row items-center gap-6">
          <div>
            <ChangeLang />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center min-h-[600px] mb-20">
        <Card className="min-h-96">
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="w-96 min-h-96 flex flex-col gap-6"
            >
              <div className="w-full flex justify-center items-center">
                <img src={ImageLogo} alt="" className="h-20 aspect-square" />
              </div>
              <h1 className="w-full text-center text-2xl capitalize font-black">
                {t("auth.register")}
              </h1>

              <TextField
                id="outlined-name"
                label={t("auth.name")}
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                id="outlined-email"
                label={t("auth.email")}
                type="email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                id="outlined-password"
                label={t("auth.password")}
                type="password"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                id="outlined-confirm-password"
                label={t("auth.confirm_password")}
                type="password"
                variant="outlined"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
              />

              <div>
                <Checkbox
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                />{" "}
                <span>{t("auth.accept_term")}</span>
              </div>

              <Button type="submit" variant="contained" size="large">
                {t("auth.register")}
              </Button>

              <div className="mb-12">
                <span className="font-bold">{t("auth.sentences2")}</span>
                <Link
                  to="/login"
                  className="mx-2 hover:underline text-blue-400"
                >
                  {t("auth.login")}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
