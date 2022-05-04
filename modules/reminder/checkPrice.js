const fetch = require('node-fetch');
const cheerio = require("cheerio")

const checkPrice = async (url) => {
  let allHtml = await fetch(url).then(res => res.text());
  //console.log(allHtml);
  const $ = cheerio.load(allHtml);
  let data = $('#ppd');
  //console.log(price)
  let priceInUSDArr = data.find('.a-price').html()//.split('$');
  //let priceInUSD = priceInUSDArr[0].trim() !== '' ? priceInUSDArr[0].trim() : priceInUSDArr[1]?.trim();
  console.log(priceInUSDArr);
}

checkPrice('https://www.amazon.in/boAt-Rockerz-255-Neo-Bluetooth/dp/B09NYK3CF2');