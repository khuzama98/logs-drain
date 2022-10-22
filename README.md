# Custom Logs Drain App

## Intro:
The app helps to drain logs from your deployed vercel App and persist the logs in AWS S3 bucket.

## Getting Started:

1. Clone the repo.
2. Create an integration on vercel for Log Drain.
3. Create an IAM User & S3 Bucket on AWS.
4. Change .env.example to .env and add your Keys.
5. Deploy the repo to vercel.
6. Add Redirect Uri.

Your custom is now ready to be used, Open your primary app and in integrations section go to your custom log drain and integrate it to your custom logs drain.

## Flow:

There are 3 routes in this app.
- /api/callback - which is used for making integrations with primary apps.
- /api/store - which is used for storing the logs to mongoDB when recieved from vercel.
- /api/batch - which is used for cron job, triggered with the help of github actions, currently set to be triggered after every 24 hours at 00:00 am.

NOTE: The batch size of logs which is saved to S3 controlled from env variable called `BATCH_SIZE` in number of logs you want to add in the batch.
## Structure:

You can find all the actions in the action folder.
- aws.ts - contains action to store batched logs file to S3 bucket.
- callback.ts - contains the actions related to the integration with primary app.
- logStorage.ts - contains all the CRUD actions related to logs to MongoDB.

-----

## Deployed Version

If you want to try deployed version you can try it on.
- https://vercel.com/integrations/custom-logs-drain