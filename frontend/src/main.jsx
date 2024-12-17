import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/be-vietnam-pro";
import "@fontsource/sofia";
import LoginProvider from "./context/LoginProvider";
import i18n from "./i18.js";
import { I18nextProvider } from "react-i18next";
import axios from "axios";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <LoginProvider>
          <App />
        </LoginProvider>
      </I18nextProvider>
    </Provider>
  </StrictMode>
);
