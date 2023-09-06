require("@nomicfoundation/hardhat-truffle5");
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
    url: API_URL,
    accounts: [`0x${PRIVATE_KEY}`],
  }
},
};
