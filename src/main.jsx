import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./_reset.css";
import { setAuthorizationHeader } from "./api/client";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import "./index.css";
import storage from "./utils/storage";

const accessToken = storage.get("auth");

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider isDefaultLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
