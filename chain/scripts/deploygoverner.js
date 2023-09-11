const hre = require("hardhat");
const {ethers} = hre;

const deployGovernorContract = async function () {
  const [deployer] = await hre.ethers.getSigners();
  const MyToken = await ethers.getContractFactory("MedBlocksToken");
  
  // Start deployment, returning a promise that resolves to a contract object
  const myToken = await MyToken.deploy();
  const Timelock = await ethers.getContractFactory("TimeLock");
  const timelock = await Timelock.deploy(172800, [], [], deployer.address);
  const args = [
    myToken.address,
    timelock.address,
    4,
    5,
    1,
  ];

console.log("----------------------------------------------------");
  console.log("Deploying GovernorContract and waiting for confirmations...");

  const GovernerContract = await ethers.getContractFactory("MyGovernor");
  const governorContract = await GovernerContract.deploy(myToken.target,
    timelock.target,
    4,
    5,
    1);
  console.log(`GovernorContract at ${governorContract.target}`);
}

deployGovernorContract().catch((error) => {
  console.error(error);
  process.exit(1);
}   );