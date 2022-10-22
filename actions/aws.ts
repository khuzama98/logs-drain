import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formatISO from "date-fns/formatISO";

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.AWS_BUCKET;

const s3Client = new S3Client({ region: REGION });

const storeObject = async (objectToStore: any) => {
  try {
    const params = {
      Bucket: BUCKET,
      Key: `${objectToStore.source}-${formatISO(
        new Date(objectToStore.timestamp)
      )}.txt`,
      Body: JSON.stringify(objectToStore.batchedLogs, null, 2),
      ContentType: "text/plain",
    };

    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully created " +
        params.Key +
        " and uploaded it to " +
        params.Bucket +
        "/" +
        params.Key
    );
    return results;
  } catch (e) {
    console.log("Error", e);
    throw new Error(e as string);
  }
};

export { storeObject };
