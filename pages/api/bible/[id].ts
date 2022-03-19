import { NextApiRequest, NextApiResponse } from "next";
import { IBible } from "../../../interfaces/IBible";
import { loadBible } from "../../../repositories/bibleRepository";
import { translationRepository } from "../../../repositories/translationRepository";
import { loadVerses } from "../../../repositories/verseRepository";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBible | any>
) {
  try {
    const { id } = req.query;
    const translation = translationRepository.get().find((x) => x.id == id);
    if (!translation) return res.status(400).json({ error: "bible not found" });
    const verses = await loadVerses(translation);
    const bible = loadBible(translation, verses);
    res.status(200).json(bible);
  } catch (error: any) {
    res.status(400).json(error);
  }
}
