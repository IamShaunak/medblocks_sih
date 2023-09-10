const hre = require("hardhat");
const {ethers} = hre;

async function deployTimelock() {
    const [deployer] = await ethers.getSigners();
    const Timelock = await ethers.getContractFactory("TimeLock");
    const timelock = await Timelock.deploy(172800, [], [], deployer.address);
    await timelock.waitForDeployment();
    console.log(timelock);
}

deployTimelock().catch((error) => {
    console.error(error);
    process.exit(1);
}   );