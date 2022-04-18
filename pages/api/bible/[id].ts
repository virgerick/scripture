import { NextApiRequest, NextApiResponse } from "next";
import { IBible } from "../../../interfaces/IBible";
import { loadBible } from "../../../repositories/bibleRepository";
import { translationRepository } from "../../../repositories/translationRepository";
import { loadVerses } from "../../../repositories/verseRepository";
const dictionary:{[key:string]:IBible}={};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBible | any>
) {
  try {
    const { id } = req.query;
    if(dictionary[id[0]])return res.status(200).send(dictionary[id[0]])
    const translation = translationRepository.get().find((x) => x.id == id);
    if (!translation) return res.status(400).json({ error: "bible not found" });
    console.log({translation})
    const verses = await loadVerses(translation);
    console.log({verses});

    const bible = loadBible(translation, verses);
    dictionary[id[0]]=bible;
    res.status(200).send(bible);
  } catch (error: any) {
    res.status(400).json(error);
  }
}
