import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBookType } from "../../interfaces/IBookType";
import { IProgressRead } from "../../interfaces/IProgressRead";
import { ITranslation } from "../../interfaces/ITranslations";
import { IValueKey } from "../../interfaces/IValueKey";
import { Verse } from "../../models/verse";
import type { RootState } from "../store";

// Define a type for the slice state
interface AppState {
  book: string;
  bookTypes: IBookType[];
  progress: Array<IProgressRead>;
  chapter: number;
  chapters: number[];
  language: string;
  languages: string[];
  loading: boolean;
  translation: string;
  translations: ITranslation[];
  verses: Verse[];
}

// Define the initial state using that type
const initialState: AppState = {
  book: "01O",
  progress: [],
  bookTypes: [],
  chapter: 0,
  chapters: [],
  language: "Spanish",
  languages: [],
  loading: false,
  translation: "valera",
  translations: [],
  verses: [],
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBook: (state, action: PayloadAction<string>) => {
      state.book = action.payload;
    },
    setBookTypes: (state, action: PayloadAction<Array<IBookType>>) => {
      state.bookTypes = action.payload;
    },
    setChapter: (state, action: PayloadAction<number>) => {
      state.chapter = action.payload;
    },
    setChapters: (state, action: PayloadAction<number[]>) => {
      state.chapters = action.payload;
    },

    setLanguages: (state, action: PayloadAction<string[]>) => {
      state.languages = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProgress: (state, action: PayloadAction<IProgressRead>) => {
      const progress = state.progress.find(
        (x) => x.translationId == action.payload.translationId
      );

      if (!progress) {
        state.progress.push(action.payload);
        return;
      }
      progress.translationId = action.payload.translationId;
      progress.book = action.payload.book;
      progress.chapter = action.payload.chapter;
    },
    setTranslations: (state, action: PayloadAction<ITranslation[]>) => {
      state.translations = action.payload;
    },
    setTranslation: (state, action: PayloadAction<string>) => {
      state.translation = action.payload;
    },
    setVerses: (state, action: PayloadAction<Verse[]>) => {
      state.verses = action.payload;
    },
  },
});

export const {
  setBook,
  setBookTypes,
  setChapter,
  setChapters,
  setLanguage,
  setLanguages,
  setLoading,
  setTranslation,
  setTranslations,
  setVerses,
  setProgress,
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBook = (state: RootState) => state.app.book;
export const selectBookTypes = (state: RootState) => state.app.bookTypes;
export const selectChapter = (state: RootState) => state.app.chapter;
export const selectChapters = (state: RootState) => state.app.chapters;
export const selectLanguage = (state: RootState) => state.app.language;
export const selectLanguages = (state: RootState) => state.app.languages;
export const selectLoading = (state: RootState) => state.app.loading;
export const selectTranslation = (state: RootState) => state.app.translation;
export const selectTranslations = (state: RootState) => state.app.translations;
export const selectVerses = (state: RootState) => state.app.verses;
export const selectProgress = (state: RootState) => state.app.progress;

export default appSlice.reducer;
