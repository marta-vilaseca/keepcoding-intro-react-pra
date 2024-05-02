import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/login/AuthContextProvider";
import { logout } from "../../pages/login/service";

export default function Header() {
  const navigate = useNavigate();
  const user = useAuth().username;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <h1>NodePop</h1>
      <nav>
        <ul>
          {user && (
            <li>
              Hola <strong>{user}</strong>!
            </li>
          )}
          <li>
            <NavLink to="/adverts" className={(navData) => (navData.isActive ? "active-style" : "none")}>
              Adverts
            </NavLink>
          </li>
          <li>
            <NavLink to="/adverts/new" className={(navData) => (navData.isActive ? "active-style" : "none")}>
              Create new advert
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
