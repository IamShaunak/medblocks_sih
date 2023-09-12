const hre = require("hardhat");
const {ethers} = hre;

const setupGovernorContract = async function () {

    const [deployer] = await hre.ethers.getSigners();
  const MyToken = await ethers.getContractFactory("MedBlocksToken");
  
  // Start deployment, returning a promise that resolves to a contract object
  const myToken = await MyToken.deploy();
  const Timelock = await ethers.getContractFactory("TimeLock");
  const timelock = await Timelock.deploy(172800, [], [], deployer.address);

    const GovernerContract = await ethers.getContractFactory("MyGovernor");
    const governorContract = await GovernerContract.deploy(myToken.target,
      timelock.target,
      4,
      5,
      1);   
      console.log("Setting up roles for governor contract...");
      const proposerRole = await timelock.PROPOSER_ROLE();
      const executorRole = await timelock.EXECUTOR_ROLE();
      const adminRole = await timelock.TIMELOCK_ADMIN_ROLE();

      const proposerTx = await timelock.grantRole(proposerRole, governorContract.target);

      await proposerTx.wait(1);

        const executorTx = await timelock.grantRole(executorRole, "0x0000000000000000000000000000000000000000"
        );
        await executorTx.wait(1);

        const revokeTx = await timelock.revokeRole(adminRole, deployer.address);
        await revokeTx.wait(1);
}

setupGovernorContract().catch((error) => {
    console.error(error);
    process.exit(1);
  }   );