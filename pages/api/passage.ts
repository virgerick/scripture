// https://getbible.net/json?passage=1Jn3:16&v=valera
import { NextApiRequest, NextApiResponse } from "next";
import { ITranslation } from "../../interfaces/ITranslations";
import { Verse } from "../../models/verse";
import { translationRepository } from "../../repositories/translationRepository";
import { loadVerses } from "../../repositories/verseRepository";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  //   const result= await fetch("https://getbible.net/json?passage=1Jn3:16&v=valera");

  const { v, version, book, b, chapter, c, verses } = req.query;

  const lang = v || version || "valera";
  const libro = b ?? book;
  const capitulo = c ?? chapter;
  console.log({ lang, libro, capitulo });

  const language = translationRepository
    .get()
    .find((t) => t.abbreviation == lang);

  if (!language)
    return res.status(400).send({ error: "translation not found" });
  if (!libro && !capitulo && !verses) {
    return res.send( await loadVerses(language));
  }

  if (libro&&!capitulo&&!verses) {
   return res.send( await (await loadVerses(language)).filter(x=>x.book_nr==libro));
  }

  if (libro&&capitulo&&!verses) {
   return res.send( await (await loadVerses(language)).filter(x=>x.book_nr==libro&&x.chapter_nr==capitulo));
  }
  if (libro&&capitulo&&verses) {
   return res.send( await (await loadVerses(language)).filter(x=>x.book_nr==libro&&x.chapter_nr==capitulo&&x.verse_nr==verses));
  }

  try {
  } catch (error) {
    res.send(error);
  }
}
