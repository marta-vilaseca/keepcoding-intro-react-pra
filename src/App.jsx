import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import { AdvertPage } from "./pages/adverts/AdvertPage";
import { AdvertsPage } from "./pages/adverts/AdvertsPage";
import { NewAdvertPage } from "./pages/adverts/NewAdvertPage";
import { LoginPage } from "./pages/login/LoginPage";
import { NotFoundPage } from "./pages/notfound/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path=":id" element={<AdvertPage />} />
        <Route path="new" element={<NewAdvertPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
