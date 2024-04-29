import clsx from "clsx";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./layout.module.css";

// interface LayoutProps {
//   dark: boolean;
// }

// export default function Layout({ dark }: LayoutProps) {
export default function Layout() {
  //   const className = clsx(styles.layout, {
  //     [styles.dark]: dark,
  //   });
  const className = clsx(styles.layout);
  return (
    <div className={className}>
      <Header />
      <main>
        <h2>hola</h2>
      </main>
      <Footer />
    </div>
  );
}
