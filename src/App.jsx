import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/auth/RequireAuth";
import { AdvertPage } from "./pages/adverts/AdvertPage";
import { AdvertsPage } from "./pages/adverts/AdvertsPage";
import { NewAdvertPage } from "./pages/adverts/NewAdvertPage";
import { LoginPage } from "./pages/login/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <div className="container">
              <Outlet />
            </div>
          </RequireAuth>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path=":id" element={<AdvertPage />} />
        <Route path="new" element={<NewAdvertPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
