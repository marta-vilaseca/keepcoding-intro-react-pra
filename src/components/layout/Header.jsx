import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUserName } from "../../api/client";
import Nodepop from "../../assets/nodepop.svg?react";
import { useAuth } from "../../context/AuthContextProvider";
import { logout } from "../../services/loginService";
import storage from "../../utils/storage";
import { Dialog } from "../common/Dialog";
import "./header.css";

export default function Header() {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const { username, isLogged, onLogout } = useAuth();

  useEffect(() => {
    if (isLogged) {
      const fetchUsername = async () => {
        try {
          const accessToken = storage.get("auth");
          if (accessToken) {
            const username = await getUserName(accessToken);
          }
        } catch (error) {
          console.error("Error fetching username", error);
        }
      };

      fetchUsername();
    }
  }, [isLogged]);

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const confirmLogout = () => {
    setShowConfirmLogout(true);
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  return (
    <>
      <header className="header">
        <h1 className="logo">
          <Link to={`/`}>
            <Nodepop className="icon" /> <span>NodePop</span>
          </Link>
        </h1>
        {isLogged && (
          <nav>
            <p className="nav__user-greeting">
              Hola <strong>{username}</strong>!
            </p>
            <ul className="nav__navigation">
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
                <button className="nav__button" onClick={confirmLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
      {showConfirmLogout && <Dialog dialogText="Are you sure you want to log out?" confirmAction={handleLogout} cancelAction={cancelLogout} />}
    </>
  );
}
