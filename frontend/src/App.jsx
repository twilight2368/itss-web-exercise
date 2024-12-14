import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MainLayout from "./layouts/MainLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home/*" element={<MainLayout />}>
          <Route index element={<></>} />
          <Route path="schedule" element={<>schedule</>} />
          <Route path="target" element={<>target</>} />
          <Route path="statistics" element={<>statistics</>} />
          <Route path="nutrition" element={<>nutrition</>} />
          <Route path="*" element={<>Not found</>} />
        </Route>
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
