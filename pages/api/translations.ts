import { NextApiRequest, NextApiResponse } from "next";
import { ITranslation } from "../../interfaces/ITranslations";
const translations: Array<ITranslation> = require("../Assets/translations.json");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<ITranslation> | any>
) {
  res.status(200).json(translations);
}
