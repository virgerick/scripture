import Link from "next/link";
import styles from "../styles/layout.module.css";
export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.title}>The Scripture</a>
      </Link>


    </header>
  );
};
