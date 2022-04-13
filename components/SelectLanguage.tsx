import React from "react";
import { setLanguage } from "../app/features/appSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const SelectLanguage = () => {
  const languages = useAppSelector((state) => state.app.languages);
  const language = useAppSelector((state) => state.app.language);
  const dispatch = useAppDispatch();
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
     <label htmlFor="selectLanguage">Idioma</label>
      <select id="selectLanguage" value={language}
      onChange={(e)=> dispatch(setLanguage(e.target.value))}>
        <option value={""}>Todas</option>
        {languages.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
};