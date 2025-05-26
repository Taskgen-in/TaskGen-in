// lib/b2.js
import { S3Client } from "@aws-sdk/client-s3";

export const b2 = new S3Client({
  region: "us-west-004", // change to your bucket region!
  endpoint: "https://s3.us-west-004.backblazeb2.com", // update for your region
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
  },
});
