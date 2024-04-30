import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>NodePop</h1>
      <nav>
        <ul>
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
            <button>Log Out</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
