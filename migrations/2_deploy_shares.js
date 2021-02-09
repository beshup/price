const Shares = artifacts.require("Shares");

module.exports = function (deployer) {
  deployer.deploy(Shares);
};
