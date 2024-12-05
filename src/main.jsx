import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { Routes, Route } from "react-router";
import NotFound from "./components/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
       <Route path ="/" element={<App/>}/>
       <Route path ="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
