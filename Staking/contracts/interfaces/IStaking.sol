// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IStaking {
    function getReward(address user) external returns (uint256);

    function stakeBalanceOfUser(address _user) external view returns (uint256);
}
