import P from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context";

function RequireAuth({ children }) {
  const location = useLocation();
  const { isLogged } = useAuth();

  return isLogged ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

RequireAuth.propTypes = {
  children: P.node.isRequired,
};

export default RequireAuth;
