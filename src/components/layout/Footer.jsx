import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <ul>
        <li>
          <span className="emojicon">👩🏻‍💻</span>
          <a href="https://github.com/marta-vilaseca" target="_blank">
            Marta Vilaseca
          </a>
          &copy; 2024 for
        </li>
        <li>
          <a href="https://keepcoding.io/" target="_blank">
            KeepCoding Tech School
          </a>
        </li>
      </ul>
    </footer>
  );
}
