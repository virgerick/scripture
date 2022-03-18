import type { NextApiRequest, NextApiResponse } from "next";
import { IBible } from "../../interfaces/IBible";
import { loadVerses, loadBible, bibles } from "../../utilities/LoadBlible";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<IBible> | any>
) {
  if (bibles.length == 0) {
    //await loadBible();
    const verser = await loadVerses({
      language: "Spanish",
      translation: "Reina Valera (1909)",
      abbreviation: "valera",
      textdirection: "LTR",
      filename: "Spanish__Reina_Valera_(1909)__valera__LTR",
      hash: "268a947e3796c99ce87ba1af722253d2c7b51739",
      id: "94",
    });
  }
  res.status(200).json(bibles);
}
