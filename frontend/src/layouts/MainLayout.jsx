import { useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import MainSidebar from "../components/sidebar/MainSidebar";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/footer/Footer";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (false) {
      naviagte("/");
    }
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [location]);

  return (
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
  );
}
