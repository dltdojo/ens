const ENS = artifacts.require("./ENS.sol");
const PublicResolver = artifacts.require('./PublicResolver.sol');

module.exports = function(deployer, network) {
  if (network === 'rinkeby') {
     deployer.deploy(PublicResolver, ENS.address);
  }
};
