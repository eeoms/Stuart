const quoteUrl = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en';
const quoteoptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '98bf131b2amsh360c9ec134e7dccp1ea162jsn51375a249f9b',
    'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
  }
};

async function minionResult() {
  const response = await fetch(quoteUrl, quoteoptions);
  const result = await response.text();

  var json = JSON.parse(result);
  console.log(json.content)

  const encodedUrl = encodeURIComponent(json.content)

  const minionUrl = `https://minion.p.rapidapi.com/minion.json?text=${encodedUrl}`;
  const minionOptions = {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': '98bf131b2amsh360c9ec134e7dccp1ea162jsn51375a249f9b',
      'X-RapidAPI-Host': 'minion.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(minionUrl, minionOptions);
    const result = await response.text();
    var parseResult = JSON.parse(result);

    return parseResult.contents.translated;
  } catch (error) {
    console.error(error);
  }
}

export default minionResult;