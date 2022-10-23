// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createDrain, findDrain, storeLog } from "../../actions/logStorage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      console.log("body -->",req.body)
      let drain;
      const isDrainAvailable = await findDrain(req.body.host, req.body.source);

      if (!isDrainAvailable) {
        drain = await createDrain({
          host: req.body.host,
          source: req.body.source,
        });
      } else {
        drain = isDrainAvailable;
      }

      const logStorageResponse = await storeLog({
        message: req.body.message,
        timestamp: new Date(req.body.timestamp),
        drainId: drain.id,
      });

      res.send({
        data: [logStorageResponse],
        code: 200,
        message: "Log Successfully Saved!",
      });
    } catch (e) {
      res.send({ data: [], code: 400, message: e });
    }
  } else {
    res.send({ message: "getting it?" });
  }
}
