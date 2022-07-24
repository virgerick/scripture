import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {}
/*import { NextApiRequest, NextApiResponse } from "next";
import { ITranslation } from "../../../interfaces/ITranslations";
import { translationRepository } from "../../../repositories/translationRepository";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<ITranslation> | any>
) {
  const translations = translationRepository.get();
  res.status(200).json(translations);
}
*/