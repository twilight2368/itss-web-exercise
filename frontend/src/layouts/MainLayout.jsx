import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import MainSidebar from "../components/sidebar/MainSidebar";
import MainHeader from "../components/header/MainHeader";

export default function MainLayout() {
  const naviagte = useNavigate();
  useEffect(() => {
    if (false) {
      naviagte("/");
    }
  }, []);
  return (
    <div className="w-full h-full flex flex-row gap-0">
      <div className="w-1/6 h-screen">
        <MainSidebar />
      </div>
      <div className="w-5/6 relative h-screen overflow-y-auto custom-scrollbar">
        <div className=" sticky top-0 w-full h-20 z-50">
          <MainHeader />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
