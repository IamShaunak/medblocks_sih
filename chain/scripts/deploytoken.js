async function main() {
    // Grab the contract factory 
    const MyToken = await ethers.getContractFactory("MedBlocksToken");
  
    // Start deployment, returning a promise that resolves to a contract object
    const myToken = await MyToken.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", myToken.target);
  }
  
  main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });