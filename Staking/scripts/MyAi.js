// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const MyAi = await hre.ethers.getContractFactory("MyAi");
  const myai = await MyAi.deploy("Prince","Prince",9,100000000000000000n,"0xc1e05B3042c414A684C62c36ea748000431d3a71");

  //string memory _name, string memory _symbol, uint256 _decimals, uint256 _supply, address tokenOwner
  
  await myai.deployed();

  console.log(
    `token deployed to ${myai.address}`
  );
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
