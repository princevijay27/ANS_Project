// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
  const Factory = await hre.ethers.getContractFactory("Factory");
  const factory = await Factory.deploy("0xc1e05B3042c414A684C62c36ea748000431d3a71","0xc1e05B3042c414A684C62c36ea748000431d3a71","0xc2011b5342EdCB1a8cc5C0d3c987F7A46bd16833",2,1);

  await factory.deployed();

  console.log(
    `Factory deployed to ${factory.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
