import React, { useEffect } from "react";
import { useGetAllTranslationsQuery } from "../app/services/apiServices";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLanguages } from "../app/features/appSlice";
import { SelectLanguage } from "./SelectLanguage";
import styles from "../styles/TranslationList.module.css";
import { Bible } from "./Bible";
export const TranslationList = () => {
  const languages = useAppSelector((state) => state.app.languages);
  const language = useAppSelector((state) => state.app.language);
  const dispatch = useAppDispatch();
  const { data: translations, error, isLoading } = useGetAllTranslationsQuery();
  useEffect(() => {
    if (translations && translations.length > 0) {
      const set: Set<string> = new Set();
      translations.forEach((t) => {
        set.add(t.language);
      });
      const arr: string[] = [];
      set.forEach((l) => arr.push(l));
      dispatch(setLanguages(arr));
    }
  }, [translations]);

  return (
    <div style={{ width: "100%" }}>
      <br />
      <section className={styles.grid}>
        {translations
          ?.filter((x) => (language != "" ? x.language == language : true))
          ?.map((t) => (
            <Bible translation={t} key={t.id} />
          ))}
      </section>
    </div>
  );
};
