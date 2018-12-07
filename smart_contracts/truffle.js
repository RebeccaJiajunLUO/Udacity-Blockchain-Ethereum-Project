var HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = 'cattle estate absent any govern toss achieve immune inject immune arctic other';

module.exports = {
  networks: { 
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: "*"
    }, 
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/bbacddc90ac2494393b381b42f2034c0') 
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  }
};