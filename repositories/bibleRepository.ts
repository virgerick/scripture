/*import { Books } from "../Enums/Books";
import { IBible } from "../interfaces/IBible";
import { IBook } from "../interfaces/IBook";
import { IChapter } from "../interfaces/IChapter";
import { ITranslation } from "../interfaces/ITranslations";
import { IVerse } from "../interfaces/IVerse";
import { Verse } from "../models/verse";

export default class BibleRepository {
  get() {}
  getById(id: string) {}
}
const bibleRepository = new BibleRepository();

const loadBible=(translation:ITranslation,verses:Array<Verse>):IBible=>{
  const bible: IBible = {
    id: Number(translation.id),
    language: translation.language,
    abbreviation: translation.abbreviation,
    textDirection: translation.textdirection,
    books: new Array<IBook>(),
  };
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
          direction: translation.textdirection,
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
  return bible;
}

export { bibleRepository ,loadBible};
