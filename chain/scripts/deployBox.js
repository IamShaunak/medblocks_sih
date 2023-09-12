const hre = require("hardhat");
const {ethers} = hre;

const deployBox = async function () {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying Box contract...");
    const BoxContract = await ethers.getContractFactory("Box");
    const boxContract = await BoxContract.deploy({
        from: deployer.address,
        args:[],
        log: true,
    });
    console.log(`Box contract deployed at ${boxContract.target}`);
}

deployBox().catch((error) => {
    console.error(error);
    process.exit(1);
  }   );