require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{ 
    version: "0.8.19",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
  },
},

},
defaultNetwork: "hardhat",
networks: {
  hardhat: {},
  polygon: {
    url: process.env.API_URL,
    accounts: [`0x${process.env.PRIVATE_KEY}`],
  }
}
};
