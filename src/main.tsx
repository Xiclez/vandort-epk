import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/globals.css";
import "@fontsource-variable/grenze-gotisch/wght.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
