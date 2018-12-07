var starNotary = artifacts.require("./starNotary.sol");

module.exports = function(deployer) {
  deployer.deploy(starNotary);
};