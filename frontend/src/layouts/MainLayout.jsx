import { useContext, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import MainSidebar from "../components/sidebar/MainSidebar";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/footer/Footer";
import { LoginContext } from "../context/LoginContext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearUserInfo, setUserInfo } from "../store/UserSlicer";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef(null);
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const user_id = useSelector((state) => state.user.user_id);
  const jwt = useSelector((state) => state.user.token);
  const user_info = useSelector((state) => state.user.user_info);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user_id !== "" && jwt !== "") {
      axios
        .get(`/api/get-profile/${user_id}`, {
          headers: {
            Authorization: `Bear ${jwt}`,
          },
        })
        .then((response) => {
          dispatch(setUserInfo(response.data.data));
          setIsLogin(true);
        })
        .catch((error) => {
          dispatch(clearUserInfo());
          setIsLogin(false);
          navigate("/login");
        });
    } else {
      dispatch(clearUserInfo());
      setIsLogin(false);
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      {isLogin && user_info ? (
        <>
          <div className="w-full h-full flex flex-row gap-0">
            <div className="w-1/6 h-screen">
              <MainSidebar />
            </div>
            <div
              ref={scrollContainerRef} // Attach the ref to the scrollable div
              className="w-5/6 relative h-screen overflow-y-auto custom-scrollbar"
            >
              <div className="sticky top-0 w-full h-20 z-50">
                <MainHeader />
              </div>
              <div className="w-full">
                <Outlet />
                <div className="w-full">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
