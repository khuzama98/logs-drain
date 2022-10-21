import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const REGION = "us-east-1";

const s3Client = new S3Client({ region: REGION });

const params = {
  Bucket: "log-drain-test",
  Key: "KEY", 
  Body: "BODY", 
  ContentType: "text/plain"
};

const storeObject = async (objectToStore: any) => {
  try {
    params.Key = `${objectToStore.source}-${objectToStore.timestamp}`;
    params.Body = objectToStore.batchedLogs;

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
    throw new Error(e as string)
  }
};

export {
    storeObject
}