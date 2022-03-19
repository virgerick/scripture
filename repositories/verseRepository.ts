import { ITranslation } from "../interfaces/ITranslations";
import { IVerse } from "../interfaces/IVerses";
import { Verse } from "../models/Verses";
import { translationRepository } from "./translationRepository";

export default class VerseRepository {
  getAll(): Array<IVerse> {
    const verses: Array<Verse>;
    const translations = translationRepository.get();
    translations.forEach(async (element) => {
      const versos = await LoadVerses(element);
      if (versos) {
        verses.push(verses);
      }
    });
    return verses;
  }
}
const LoadVerses = async (translation: ITranslation): Array<Verse> => {
  const verses: Array<Verse> = [];
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
        const verse = new Verse(Number(translation.id),
                                translation.language,
                                array[0],
                                array[1],
                                array[2],
                                array[3]);
        verses.push(verse);
      });
      return verses;
    }
  } catch (error: any) {
    throw error;
  }
};

const verseRepository = new VerseRepository();
export { verseRepository };
