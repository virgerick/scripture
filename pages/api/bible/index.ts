import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Books } from "../../../Enums/Books";
import { IBible } from "../../../interfaces/IBible";
import { IBook } from "../../../interfaces/IBook";
import { IChapter } from "../../../interfaces/IChapter";
import { IVerse } from "../../../interfaces/IVerse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBible | any>
) {
  const translation = {
    language: "Spanish",
    translation: "Reina Valera (1909)",
    abbreviation: "valera",
    textdirection: "LTR",
    filename: "Spanish__Reina_Valera_(1909)__valera__LTR",
    hash: "268a947e3796c99ce87ba1af722253d2c7b51739",
    id: "94",
  };
  const bible: IBible = {
    id: Number(translation.id),
    language: translation.language,
    abbreviation: translation.abbreviation,
    textDirection: translation.textdirection,
    books: new Array<IBook>(),
  };

  const verses: Array<any> = [];
  try {
    const path: string = `./public/Assets/resources/${translation.filename}.txt`;
    const file = await readFileSync(path, "utf8");
   /* const result = await fetch(
      `/public/Assets/resources/${translation.filename}.txt`
    );
    const file = await result.text();*/
    if (file != null) {
      const lines = file.split("\n");
      lines.forEach((line) => {
        const array = line.toString().split("||");
        const verse = {
          book_nr: array[0],
          chapter_nr: array[1],
          verse_nr: array[2],
          verse: array[3],
        };
        verses.push(verse);
      });

      for (const value in Object.values(Books)) {
        const chapt = verses.filter((x) => x.chapter_nr === value);
        if (chapt.length > 0) {
          const Book: IBook = {
            id: value,
            chapters: new Array<IChapter>(),
          };
          const versos: Array<IVerse> = new Array<IVerse>();
          chapt.map((c) => {
            const v: IVerse = {
              id: c.verse_nr,
              direction: c.direction,
              text: c.verse,
            };
            versos.push(v);
          });
          const chapter: IChapter = {
            id: value,
            verses: versos,
          };
          Book.chapters.push(chapter);
          if (bible.books) {
            bible.books.push(Book);
          } else bible.books = [Book];
        }
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
  res.status(200).json(bible);
}
