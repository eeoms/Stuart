import Imgflip from 'imgflip';

const imgflip = new Imgflip({
  username: 'eoms',
  password: process.env['IMG_FLIP_PASSWORD']
})

function getRandomItem(arr) {

  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];

  return item;
}

const memeIdArray = [18159188, 3929882, 16021388, 9893821, 387095900, 23734772, 11603611, 37713277, 40407999, 5094640, 10152342]

const randomMemeId = getRandomItem(memeIdArray)
const randomFileNumber = Math.floor(Math.random() * 9999999);

async function makeMeme() {
  const jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=political&type=twopart')
  const jokeResult = await jokeResponse.text();

  var json = JSON.parse(jokeResult);

  await imgflip.meme(randomMemeId, {
    captions: [
      `${json.setup}`,
      `${json.delivery}`,
    ],
    path: `images/${randomFileNumber}.png`
  })

  return randomFileNumber;
}

export default makeMeme;