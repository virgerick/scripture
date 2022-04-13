
import Link from "next/link";
import styles from "../styles/layout.module.css";
import { SelectLanguage } from "./SelectLanguage";
export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">Scripture</Link>

      <SelectLanguage />
    </header>
  );
};
