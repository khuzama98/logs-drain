// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken, createLogDrain } from "../../actions/callback";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      if (!req.body.type || !req.body.url) {
        return res.send({ message: "Error: provide type and url", code: 400 });
      }

      const token = await getToken(req.body.code);

      await createLogDrain(token, {
        name: "custom-logs-drain",
        type: req.body.type,
        url: req.body.url,
      });

      res.send({
        data: [],
        code: 200,
        message: "Log Drain Successfully Added!",
      });
    } catch (e) {
      res.send({ data: [], code: 400, message: e });
    }
  } else {
    res.send({ message: "getting it?" });
  }
}
