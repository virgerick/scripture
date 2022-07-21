import React, { useEffect } from "react";
import { useGetAllTranslationsQuery } from "../app/services/apiServices";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLanguages } from "../app/features/appSlice";
import { SelectLanguage } from "./SelectLanguage";
import styles from "../styles/TranslationList.module.css";
import { Bible } from "./Bible";
import Loading from "./Loading";
export const TranslationList = () => {
  const language = useAppSelector((state) => state.app.language);
  const dispatch = useAppDispatch();
  const {
    data: translationResult,
    error,
    isLoading,
  } = useGetAllTranslationsQuery();
  useEffect(() => {
    if (translationResult && translationResult?.succeded) {
      const set: Set<string> = new Set();
      translationResult.items.forEach((t) => {
        set.add(t.language);
      });
      const arr: string[] = [];
      set.forEach((l) => arr.push(l));
      dispatch(setLanguages(arr));
    }
  }, [dispatch, translationResult]);

  return isLoading ? (
    <Loading type="bounce" title="Loading" />
  ) : (
    <>
      <SelectLanguage />
      <br />{" "}
      <section className={styles.grid}>
        {translationResult &&
          translationResult.succeded &&
          translationResult.items
            ?.filter((x) => (language != "" ? x.language == language : true))
            ?.map((t) => <Bible translation={t} key={t.id} />)}
      </section>
    </>
  );
};
