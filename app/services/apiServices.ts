import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITranslation } from "../../interfaces/ITranslations";
import { Verse } from "../../models/verse";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => {
    return {
      getAllTranslations: builder.query<ITranslation[], void>({
        query: () => `translations`,
      }),
      getTranslationById: builder.query<ITranslation, number>({
        query: (id) => `translations/${id}`,
      }),
      getChapterByVersionAndBook: builder.query<
        Verse[],
        { version: string; book: string }
      >({
        query: (req) => `chapters?v=${req.version}&b=${req.book}`,
      }),
      getVersesByBookChapterBookAndVerses: builder.query<
        Verse[],
        { version: string; book: string; chapter: string; verses: string }
      >({
        query: (req) =>
          `passage?v=${req.version}${req.book && `&b=${req.book}`}${
            req.chapter && `&c=${req.chapter}`
          }${req.verses && `&verses=${req.verses}`}`,
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTranslationByIdQuery,
  useGetAllTranslationsQuery,
  useGetChapterByVersionAndBookQuery,
  useGetVersesByBookChapterBookAndVersesQuery,
  useLazyGetAllTranslationsQuery,
  useLazyGetChapterByVersionAndBookQuery,
  useLazyGetTranslationByIdQuery,
  useLazyGetVersesByBookChapterBookAndVersesQuery,
} = api;
