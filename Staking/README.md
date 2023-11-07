
# Staking Contract 

We are able to create multiple pools by using the factory contract 
and able to choose different token for different pools and also we are able to choose staking rate and time period as well as

1) For creating pools - use createPool function and get staking contract address
2) For Staking pools - use stake function in staking contract
3) For Withdraw stake Token - use withdraw function in staking contract
4) For get information about claim token - use earned function to get information 
5) For claiming reward token - use withdrawRewardToken function and also transfer reward token to factory contract  



## Deployment

To run the project
so that all the dependency install
```bash
  npm i
```
For compile the smart contract 
```bash
  npx hardhat compile
```
Deploying smart contract to live network
```bash
  npx hardhat run scripts/Factory.js --network choose network
```
From this smart contract Deployed into public blockchain and you will get Factory Contract address 





## Acknowledgements

 - [Smart Contract tutorial](https://ethereum.org/en/developers/tutorials/)
 - [Hardhat tutorial](https://hardhat.org/tutorial)

