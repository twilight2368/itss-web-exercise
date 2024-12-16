import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import ProfilePage from "./pages/profile/ProfilePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import SchedulePage from "./pages/schedule/SchedulePage";
import TargetPage from "./pages/target/TargetPage";
import TargetDetailWeightGainPage from "./pages/target/TargetDetailWeightGainPage";
import TargetDetailWeightLossPage from "./pages/target/TargetDetailWeightLossPage";
import TargetHealthImprovePage from "./pages/target/TargetHealthImprovePage";
import StatisticPage from "./pages/statistic/StatisticPage";
import NutritionPage from "./pages/nutrition/NutritionPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home/*" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="target" element={<TargetPage />} />
            <Route
              path="target/gain_weight"
              element={<TargetDetailWeightGainPage />}
            />
            <Route
              path="target/loss_weight"
              element={<TargetDetailWeightLossPage />}
            />
            <Route
              path="target/health_improve"
              element={<TargetHealthImprovePage />}
            />
            <Route path="statistics" element={<StatisticPage />} />
            <Route path="nutrition" element={<NutritionPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
