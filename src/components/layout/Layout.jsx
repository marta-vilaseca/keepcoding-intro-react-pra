import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ title, children }) {
  return (
    <div className="layout">
      <Header className="layout__header" />
      <main className="layout__main">
        <h2>{title}</h2>
        {children}
      </main>
      <Footer className="layout__footer" />
    </div>
  );
}
