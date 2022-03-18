import type { NextApiRequest, NextApiResponse } from "next";
import { IBible } from "../../interfaces/IBible";
import { IVerse } from "../../interfaces/IVerse";
import { loadBible, bibles } from "../../utilities/LoadBlible";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<IBible>>
) {
  if (bibles.length == 0) {
    await loadBible();
  }

  res.status(200).json(bibles);
}
