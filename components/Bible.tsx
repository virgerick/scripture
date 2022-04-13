import Link from "next/link";
import React from "react";
import { ITranslation } from "../interfaces/ITranslations";
import styles from "../styles/bible.module.css";
interface IProp {
  translation: ITranslation;
}
export const Bible = ({ translation }: IProp) => {
  return (
    <Link href={`/bible/${translation.id}`}>
    <div className={styles.book}>
      <div className={styles.back}></div>
      <div className={styles.page6}>
        {/* <button>
         Start Reading bible
        </button> */}
      </div>
      <div className={styles.page5}></div>
      <div className={styles.page4}></div>
      <div className={styles.page3}></div>
      <div className={styles.page2}></div>
      <div className={styles.page1}></div>
      <div className={styles.front}>
        <h3>{translation.translation}</h3>
        <label>{translation.language}</label>
      </div>
    </div>
    </Link>
  );
};
