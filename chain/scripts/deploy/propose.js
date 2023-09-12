const hre = require("hardhat");
const {ethers} = hre;
const {network} = require('hardhat');
const fs = require('fs');
const proposalsFile = "proposals.json";

async function moveBlocks(amount){
    console.log("Moving blocks...");
    for(let index = 0; index<amount; index++){
        await network.provider.request({
            method: "evm_mine",
            params: [],
        })
    }
    console.log(`Moving ${amount} blocks...`);
}

async function propose(args, functionToCall, proposalDescription){
    const [deployer] = await hre.ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MedBlocksToken");
    
    // Start deployment, returning a promise that resolves to a contract object
    const myToken = await MyToken.deploy();
    const Timelock = await ethers.getContractFactory("TimeLock");
    const timelock = await Timelock.deploy(172800, [], [], deployer.address);
    

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
    console.log(`Proposal Description: \n ${proposalDescription}`);
     
    const encodedFunctionCall = boxContract.interface.encodeFunctionData(functionToCall, args);
    console.log(`Proposing ${functionToCall} with args ${args}...`);
    console.log(encodedFunctionCall);
    
  
  console.log("----------------------------------------------------");
    console.log("Deploying GovernorContract and waiting for confirmations...");
  
    const GovernerContract = await ethers.getContractFactory("MyGovernor");
    const governorContract = await GovernerContract.deploy(myToken.target,
      timelock.target,
      4,
      5,
      1);
    console.log(`GovernorContract at ${governorContract.target}`);
  
    const proposeTx = await governorContract.propose(
      [boxContract.target],
      [0],
      [encodedFunctionCall],
      proposalDescription
    );
  
    await moveBlocks(1+1);
    const proposeReceipt = await proposeTx.wait(0);
    console.log(proposeReceipt.logs);

    const proposalId = proposeReceipt.logs[0].topics;
    let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    proposals["31337"].push(proposalId.toString());
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals));
  }


propose([77], "store", "string").then(() => process.exit(0))
.catch((error) => {
  console.error(error)
  process.exit(1)
})