//const CronJob = require("cron").CronJob;
import makeMeme from "./makeMeme.js";
import minionResult from "./minionResult.js";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env['API_KEY'],
  appSecret: process.env['API_SECRET'],
  accessToken: process.env['ACCESS_TOKEN'],
  accessSecret: process.env['ACCESS_SECRET']
});

const bearer = new TwitterApi(process.env['BEARER_TOKEN']);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

const tweet = async () => {

  const fileId = await makeMeme()
  const fileName = `${fileId}.png`

  const mediaId = await twitterClient.v1.uploadMedia(`./images/${fileName}`)

  try {
    const translatedText = await minionResult()
    await twitterClient.v2.tweet(translatedText, { media: { media_ids: [mediaId] } });
    console.log(`Tweeted, "${translatedText}" with image ${fileName}`)
  } catch (e) {
    console.log(e)
  }
}

tweet();
/*
const cronTweet = new CronJob("0 6 * * *", async () => {
  tweet();
});

cronTweet.start();
*/