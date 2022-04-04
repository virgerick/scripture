import { NextApiRequest, NextApiResponse } from "next";
import { translationRepository } from "../../repositories/translationRepository";
import { loadVerses } from "../../repositories/verseRepository";
let cache: Array<{key:string|string[],value:object}> =[]
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { v, version, book, b } = req.query;

  const lang = v || version || "valera";
  const libro = b ?? book;
  const language = translationRepository
    .get()
    .find((t) => t.abbreviation == lang);

  if (!language || !libro)
    return res.status(400).send({ error: "translation not found" });
    console.log({cache,libro});
console.log({cache,libro});

  if (cache.find(x=>x.key== libro)) {
    return res.send(cache.find(x=>x.key== libro));
  }
  const verses = await loadVerses(language);
  const chapter = verses
    .filter((x) => x.book_nr === libro)
    .map((x) => Number(x.chapter_nr));
  const result = new Set(chapter);
  const arr: number[] = [];
  result.forEach((x) => {
    arr.push(x);
  });
  cache.push({key:libro,value: arr});
  res.send(arr);
}
