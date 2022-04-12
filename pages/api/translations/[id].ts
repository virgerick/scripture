import { NextApiRequest, NextApiResponse } from "next";
import { ITranslation } from "../../../interfaces/ITranslations";
import { translationRepository } from "../../../repositories/translationRepository";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITranslation | any>
) {
  const { id } = req.query;

  const translation = translationRepository.getById(id.toString());
  if (!translation) return res.status(400).json({ error: "not found" });
  res.status(200).json(translation);
}
