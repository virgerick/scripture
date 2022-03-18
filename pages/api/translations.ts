import { NextApiRequest, NextApiResponse } from "next";
import { ITranslation } from "../../interfaces/ITranslations";
import { translations } from "../../utilities/LoadBlible";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<ITranslation> | any>
) {
  res.status(200).json(translations);
}
