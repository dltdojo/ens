var TestRPC = require('ethereumjs-testrpc');
var HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = process.env.TEST_MNEMONIC

module.exports = {
  networks: {
    'dev.fifs': {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    'dev.auction': {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      network_id: 4,
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/'),
      gas: 4.5e6
    },
    test: {
      provider: TestRPC.provider(), // in-memory TestRPC provider
      network_id: "*" // Match any network id
    }
  }
};
