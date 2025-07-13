import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <ToastProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </StrictMode>
);
