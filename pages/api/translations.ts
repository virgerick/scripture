import { NextApiRequest, NextApiResponse } from "next";
import { ITranslation } from "../../interfaces/ITranslations";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<ITranslation> | any>
) {
  const translations = require("../../Assets/translations.json");
  res.status(200).json(Object.values(translations));
}
