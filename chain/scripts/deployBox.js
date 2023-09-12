const hre = require("hardhat");
const {ethers} = hre;

const deployBox = async function () {
    const [deployer] = await hre.ethers.getSigners();

    const Timelock = await ethers.getContractFactory("TimeLock");
    const timelock = await Timelock.deploy(172800, [], [], deployer.address);
    await timelock.waitForDeployment();


    console.log("Deploying Box contract...");
    const BoxContract = await ethers.getContractFactory("Box");
    const boxContract = await BoxContract.deploy({
        from: deployer.address,
        args:[],
        log: true,
    });

    await boxContract.waitForDeployment();

    console.log(`Box contract deployed at ${boxContract.target}`);


    const transferOwnerTx = await boxContract.transferOwnership(timelock.target);
    await transferOwnerTx.wait(1);

    console.log("Owner of Box contract transferred to timelock contract");
}

deployBox().catch((error) => {
    console.error(error);
    process.exit(1);
  }   );