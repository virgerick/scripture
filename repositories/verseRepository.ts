/*import { readFileSync } from "fs";
import { ITranslation } from "../interfaces/ITranslations";
import { IVerse } from "../interfaces/IVerse";
import { Verse } from "../models/verse";
import { translationRepository } from "./translationRepository";

export default class VerseRepository {
  getAll(): Array<Verse> {
    let verses: Array<Verse> = [];
    const translations = translationRepository.get();
    translations.forEach(async (element) => {
      const versos = await loadVerses(element);
      if (versos) {
        verses = [...verses, ...versos];
      }
    });
    return verses;
  }
}
export const loadVerses = async (
  translation: ITranslation
): Promise<Array<Verse>> => {
  const verses: Array<Verse> = [];
  let file: string = "";
  if (process.env.NODE_ENV == "development") {
    file = readFileSync(
      `./public/Assets/resources/${translation.filename}.txt`,
      "utf8"
    );
  } else {
    const result = await fetch(
      `https://thescripture.vercel.app/Assets/resources/${translation.filename}.txt`
    );
    file = await result.text();
  }
  if (file != null) {
    const lines = file.split("\n");
    lines.forEach((line) => {
      const array = line.toString().split("||");
      const verse = new Verse(
        Number(translation.id),
        translation.abbreviation,
        array[0],
        array[1],
        array[2],
        array[3]
      );
      verses.push(verse);
    });
  }
  return verses;
};

const verseRepository = new VerseRepository();
export { verseRepository };
