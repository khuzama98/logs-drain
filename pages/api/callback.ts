// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken, createLogDrain } from "../../prisma/logs";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    if (!req.body.type || !req.body.url) {
      return res.send({ message: "", code: 400 });
    }
    console.log("body",req.body)
    const token = await getToken(req.body.code);

    await createLogDrain(token, {
      name: "custom-logs-drain",
      type: req.body.type,
      url: req.body.url,
    });

    res.redirect(req.body.next as string);
  }
  else{
    res.send({message:"getting it?"})
  }
}
