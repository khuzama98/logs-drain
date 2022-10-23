// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createDrain, findDrain, storeLog } from "../../actions/logStorage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      console.log("body -->",req.body[0])
      const {host, source, timestamp, message} = req.body[0]
      let drain;
      const isDrainAvailable = await findDrain(host, source);

      if (!isDrainAvailable) {
        drain = await createDrain({
          host: host,
          source: source,
        });
      } else {
        drain = isDrainAvailable;
      }

      const logStorageResponse = await storeLog({
        message: message,
        timestamp: new Date(timestamp),
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
