import { NextApiRequest, NextApiResponse } from "next";
import { IBible } from "../../../interfaces/IBible";
import { translationRepository } from "../../../repositories/translationRepository";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBible | any>
) {
  const { id } = req.query;
  const translation = translationRepository.get().find((x) => x.id == id);
  if (!translation) return res.status(400).json({ error: "bible not found" });

  res.status(200).json({});
}
