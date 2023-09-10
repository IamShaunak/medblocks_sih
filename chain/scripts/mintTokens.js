const hre = require("hardhat");
const { ethers } = hre;

async function mintTokens() {
  const [deployer] = await hre.ethers.getSigners();
  const MyToken = await hre.ethers.getContractFactory("MedBlocksToken");
  const myToken = await MyToken.deploy();
  await myToken.waitForDeployment();
  console.log(myToken);

  // Mint tokens to an address
  const recipientAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const amountToMint = ethers.parseEther("1"); // Adjust the amount

  const connectedToken = myToken.connect(deployer);
  await connectedToken.mint(recipientAddress, amountToMint);

  console.log(`Minted ${amountToMint} tokens to ${recipientAddress}`);

  await delegate(myToken.target, deployer);
}

async function delegate(
  governanceTokenAddress,
  delegatedAccount
){
  const governanceToken = await ethers.getContractAt("MedBlocksToken", governanceTokenAddress);
  const transactionResponse = await governanceToken.delegate(delegatedAccount);
  await transactionResponse.wait(1);
  console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)

}



mintTokens().catch((error) => {
  console.error(error);
  process.exit(1);
});
