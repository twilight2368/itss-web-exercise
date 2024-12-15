import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import NutritionsPage from "./pages/nutritions/NutritionsPage";
function App() {
  return (
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
          <Route path="nutrition" element={<NutritionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<>Not found</>} />
        </Route>
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
