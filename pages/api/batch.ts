// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { findLogs, findAllDrains, deleteLog } from "../../actions/logStorage";
import { storeObject } from "../../actions/aws";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { authorization } = req.headers;

    if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
      setTimeout(async () => {
        const pendingDeleteArray = [];
        const timestamp = Date.now();
        const filteredDrain = await findAllDrains();

        console.log("filtered drain", filteredDrain);

        for (const drain of filteredDrain) {
          const filteredLog = await findLogs(drain.id, timestamp);
          console.log("filtered logs", filteredLog);
          if (filteredLog.length) {
            const storedObjectResponse = await storeObject({
              source: drain.source,
              batchedLogs: filteredLog,
              timestamp,
            });
            for (const log of filteredLog) {
              pendingDeleteArray.push(deleteLog(log.id));
            }
            const deletedLogs = await Promise.all(pendingDeleteArray);
            console.log("deleted", deletedLogs);
          }
        }
      }, 60 * 1000);

      res.send({
        data: [],
        code: 200,
        message: "Cron Job Successfully Triggered!",
      });
    } else {
      res.send({ data: [], code: 400, message: "Authorization failed" });
    }
  } catch (e) {
    res.send({ data: [], code: 400, message: e });
  }
}
