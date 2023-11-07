// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Staking.sol";
import "./interfaces/IStaking.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Factory {
    struct Pool {
        address poolAddress;
        address token;
        address owner;
        address factoryContract;
        uint256 rewards;
        uint256 decimals;
        uint256 rewardsDuration;
        uint256 totalTokenAmount;
    }

    uint256 public poolId;

    address owner;
    address token;
    address developer;

    uint256 platformFees;
    uint256 developerFees;

    mapping(uint256 => Pool) poolAddress;
    mapping(address => bool) poolStatus;
    mapping(address => uint256) poolID;
    mapping(address => uint256[]) userPoolAddress;
    mapping(address => mapping(uint256 => bool)) userStatus;

    constructor(
        address _owner,
        address _developer,
        address _token,
        uint256 _platformFees,
        uint256 _developerFees
    ) {
        owner = _owner;
        token = _token;
        developer = _developer;
        developerFees = _developerFees;
        platformFees = _platformFees;
    }

    function setToken(address _token) external {
        require(owner == msg.sender, "not owner");
        token = _token;
    }

    function setDeveloperFee(uint256 _developerFees) external {
        require(owner == msg.sender, "not owner");
        developerFees = _developerFees;
    }

    function setPlatformFee(uint256 _platformFees) external {
        require(owner == msg.sender, "not owner");
        platformFees = _platformFees;
    }

    function setOwner(address _owner) external {
        require(owner == msg.sender, "not owner");
        owner = _owner;
    }

    function setDeveloper(address _developer) external {
        require(owner == msg.sender, "not owner");
        developer = _developer;
    }

    function createPool(
        address _token,
        address _owner,
        address _factoryContract,
        uint256 _rewards,
        uint256 _decimals,
        uint256 _rewardsDuration,
        uint256 _totalTokenAmount
    ) external returns (Staking pool) {
        require(owner == msg.sender, "not owner");
        pool = new Staking(
            _token,
            _owner,
            _factoryContract,
            _rewards,
            _decimals,
            _rewardsDuration,
            _totalTokenAmount
        );
        poolId += 1;
        poolAddress[poolId] = Pool(
            address(pool),
            _token,
            _owner,
            _factoryContract,
            _rewards,
            _decimals,
            _rewardsDuration,
            _totalTokenAmount
        );

        poolStatus[address(pool)] = true;
        poolID[address(pool)] = poolId;
    }

    function withdrawRewardToken(uint256 _poolId) external {
        require(
            IStaking(poolAddress[_poolId].poolAddress).stakeBalanceOfUser(
                msg.sender
            ) != 0,
            "token not stake"
        );

        uint256 reward = IStaking(poolAddress[_poolId].poolAddress).getReward(
            msg.sender
        );

        uint256 fees = (reward * (developerFees + platformFees)) / 100;
        reward = reward - fees;

        IERC20(token).transfer(msg.sender, reward);
        IERC20(token).transfer(owner, (fees / 2));
        IERC20(token).transfer(developer, (fees / 2));
    }

    function userStake(address user) external {
        require(poolStatus[msg.sender], "not pool address");

        uint256 _poolId = poolID[msg.sender];
        if (!userStatus[user][_poolId]) {
            userStatus[user][_poolId] = true;
            userPoolAddress[user].push((_poolId));
        }
    }

    function poolDetails(uint256 _poolId) external view returns (Pool memory) {
        return poolAddress[_poolId];
    }

    function userPool() external view returns (uint256[] memory) {
        return userPoolAddress[msg.sender];
    }

    function emergencyWithdraw(uint256 _amount) external {
        require(owner == msg.sender, "not owner");
        IERC20(token).transfer(owner, _amount);
    }
}
