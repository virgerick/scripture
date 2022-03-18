// import { readFileSync } from "fs";
import { IBible } from "../interfaces/IBible";
import { IBook } from "../interfaces/IBook";
import { IChapter } from "../interfaces/IChapter";
import { ITranslation } from "../interfaces/ITranslations";
import { IVerse } from "../interfaces/IVerse";
import { Books } from "./Books";
const translations: Array<ITranslation> = require("../Assets/translations.json");
export const bibles: Array<IBible> = [];
export const loadBible = () => {
  try {
    if (translations !== null) {
      for (const key in translations) {
        if (Object.prototype.hasOwnProperty.call(translations, key)) {
          const element = translations[key];
          loadVerses(element);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};
export const loadVerses = async (
  translation: ITranslation
): Promise<Array<any>> => {
  // assets/resources/Spanish__Reina_Valera_(1909)__valera__LTR.txt
  // let result:string='';

  const bible: IBible = {
    id: Number(translation.id),
    language: translation.language,
    abbreviation: translation.abbreviation,
    textDirection: translation.textdirection,
    books: new Array<IBook>(),
  };

  const verses: Array<any> = [];
  try {
    //const path: string = `./Assets/resources/${translation.filename}.txt`;
    //const file = await readFileSync(path, "utf8");
    const result = await fetch(
      `https://raw.githubusercontent.com/virgerick/scripture/main/Assets/resources/${translation.filename}.txt`
    );
    const file = await result.text();
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

    bibles.push(bible);
  } catch (error: any) {
    console.error(error);
  }

  return verses;
};
