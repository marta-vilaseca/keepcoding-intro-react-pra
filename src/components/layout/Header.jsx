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
  const [headerError, setHeaderError] = useState(null);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const { isLogged, onLogout } = useAuth();

  useEffect(() => {
    if (isLogged) {
      const fetchUsername = async () => {
        try {
          const accessToken = storage.get("auth");
          if (accessToken) {
            const fetchedUsername = await getUserName(accessToken);
            setUsername(fetchedUsername);
          }
        } catch (error) {
          setHeaderError(`Error fetching username: ${error.message}`);
        }
      };
      fetchUsername();
    }
  }, [isLogged, setUsername]);

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate("/login");
    } catch (error) {
      setHeaderError(`Logout failed: ${error.message}`);
    }
  };

  const resetError = () => setHeaderError(null);

  const confirmLogout = () => {
    setShowConfirmLogout(true);
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  return (
    <>
      {headerError && (
        <div className="error-message" onClick={resetError}>
          ERROR: {headerError}
        </div>
      )}
      <header className="header">
        <h1 className="logo">
          <Link to={`/`}>
            <Nodepop className="icon" /> <span>NodePop</span>
          </Link>
        </h1>
        {isLogged && (
          <nav>
            <p className="nav__user-greeting">
              Welcome back <strong>{username}</strong>!
            </p>
            <ul className="nav__navigation">
              <li>
                <NavLink to="/adverts" end>
                  Adverts
                </NavLink>
              </li>
              <li>
                <NavLink to="/adverts/new">Create new advert</NavLink>
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
      {showConfirmLogout && headerError === null && (
        <Dialog dialogText="Are you sure you want to log out?" confirmAction={handleLogout} confirmActionText="log out" cancelAction={cancelLogout} cancelActionText="cancel" />
      )}
    </>
  );
}
