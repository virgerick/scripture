
import styles from "../styles/layout.module.css";
import { SelectLanguage } from "./SelectLanguage";
export const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/">Scripture</a>

      <SelectLanguage />
    </header>
  );
};
