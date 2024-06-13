import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Nodepop from "../../assets/nodepop.svg?react";
import { useAuth } from "../../context/AuthContextProvider";
import { logout } from "../../services/loginService";
import FetchUsername from "../auth/FetchUsername";
import { ConfirmationButton } from "../common/ConfirmationButton";
import "./header.css";

export default function Header() {
  const [headerError, setHeaderError] = useState(null);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const { isLogged } = useAuth();

  const navigate = useNavigate();
  const { onLogout } = useAuth();

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
        <div className="header__inner">
          <h1 className="logo">
            <Link to={`/`}>
              <Nodepop className="icon" /> <span>NodePop</span>
            </Link>
          </h1>
          {isLogged && (
            <nav>
              <FetchUsername />
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
                  <ConfirmationButton
                    buttonClassName="nav__button"
                    buttonText="Log Out"
                    dialogText="Are you sure you want to log out?"
                    confirmAction={handleLogout}
                    confirmActionText="log out"
                    cancelActionText="cancel"
                  />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
