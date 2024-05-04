import Footer from "./Footer";
import Header from "./Header";
import "./layout.css";

export default function Layout({ title, page, children }) {
  return (
    <div className="layout">
      <Header className="layout__header" />
      <main className={`layout__main ${page}`}>
        <h2>{title}</h2>
        {children}
      </main>
      <Footer className="layout__footer" />
    </div>
  );
}
