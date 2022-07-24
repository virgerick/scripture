
import { NextApiRequest, NextApiResponse } from "next";
// import { sequelize } from "../../database";
import  "../../schemas/index"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let err: any=null;
  try {
   // await sequelize.sync({force:true});

    err = "Connection has been established successfully.";
     console.log(err);
  } catch (error) {
    err = error;
    console.error("Unable to connect to the database:", error);
  }
  res.send(err);
}
