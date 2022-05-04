const fetch = require('node-fetch');

const fetchGas = (message) => {
    fetch(`https://ethgasstation.info/api/ethgasAPI.json?api-key=${process.env.GASSTATION_TOKEN}`)
    .then(res => res.json())
    .then(d => {
      // let fastGas = (d['fast'] /10)* 21000 * 0.000000001;
      let fetchGasJ = JSON.stringify(d, null, 2)
  //     117gwei * gas limit (21000 or 32000 or something else -> 360k for nfts)
  // result is gwei or ETH (117*21000 = 2 457 000 gwei -> 0.002457 ETH)
      // message.channel.send(`\`\`\`json\n${JSON.stringify(d, null, 2)}\n\`\`\``);
      message.channel.send(`${fastGas} eth`)
    })
  }