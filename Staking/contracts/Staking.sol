// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IFactory.sol";

contract Staking is ReentrancyGuard {
    IERC20 public token;

    struct UserInfo {
        uint256 amount;
        uint256 since;
        uint256 rewardDebt;
        uint256 poolEndTime;
        bool status;
    }

    address owner;
    address factoryContract;

    uint256 public rewards;
    uint256 public decimals;
    uint256 public _totalSupply;
    uint256 public rewardsDuration;
    uint256 public totalTokenAmount;
    uint256 public totalTokenStacked;

    bool pause;

    mapping(address => UserInfo) userInfo;
    mapping(address => uint256[]) userPoolAddress;

    event Staked(address user, uint256 amount);
    event Withdrawn(address user, uint256 amount);
    event RewardPaid(address user, uint256 reward);

    modifier updateReward(address account) {
        userInfo[msg.sender].rewardDebt = _earned(msg.sender);
        _;
    }

    modifier checkStackedTOken(uint256 _amount) {
        require(totalTokenStacked >= (_amount + _totalSupply), "Pool End");
        _;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Caller is not a owner");
        _;
    }

    modifier paused() {
        require(!pause, "contract is paused");
        _;
    }

    constructor(
        address _token,
        address _owner,
        address _factoryContract,
        uint256 _rewards,
        uint256 _decimals,
        uint256 _rewardsDuration,
        uint256 _totalTokenAmount
    ) {
        owner = _owner;
        token = IERC20(_token);
        factoryContract = _factoryContract;
        rewards = _rewards;
        decimals = _decimals;
        rewardsDuration = _rewardsDuration;
        totalTokenAmount = _totalTokenAmount;
        totalTokenStacked = _totalTOkenStacked(
            _rewards,
            _decimals,
            _totalTokenAmount
        );
    }

    function stake(
        uint256 _amount
    ) external nonReentrant checkStackedTOken(_amount) paused {
        require(!userInfo[msg.sender].status, "already stacked");
        _totalSupply += _amount;

        userInfo[msg.sender].amount += _amount;
        userInfo[msg.sender].since = block.timestamp;
        userInfo[msg.sender].poolEndTime = block.timestamp + rewardsDuration;
        userInfo[msg.sender].status = true;

        token.transferFrom(msg.sender, address(this), _amount);
        IFactory(factoryContract).userStake(msg.sender);

        emit Staked(msg.sender, _amount);
    }

    function withdraw() external nonReentrant paused {
        require(
            block.timestamp >= userInfo[msg.sender].poolEndTime,
            "pool not end"
        );

        require(userInfo[msg.sender].amount > 0, "token not stacked");

        uint256 _amount = userInfo[msg.sender].amount;

        _totalSupply = _totalSupply - _amount;
        userInfo[msg.sender].amount = userInfo[msg.sender].amount - _amount;
        userInfo[msg.sender].since = block.timestamp;

        token.transfer(msg.sender, _amount);
        emit Withdrawn(msg.sender, _amount);
    }

    function getReward(
        address _user
    ) external nonReentrant paused returns (uint256) {
        require(
            factoryContract == msg.sender || msg.sender == address(this),
            "not factory contract"
        );

        uint256 reward = _earned(_user);
        userInfo[_user].rewardDebt = 0;
        userInfo[_user].since = block.timestamp;

        emit RewardPaid(_user, reward);
        return reward;
    }

    function withdrawRewardToken(
        uint256 _amount
    ) external nonReentrant onlyOwner {
        token.transfer(msg.sender, _amount);
    }

    function pausedContract(bool _status) external nonReentrant onlyOwner {
        pause = _status;
    }

    function earned(address _account) external view returns (uint256 reward) {
        return _earned(_account);
    }

    function _earned(address _account) internal view returns (uint256 reward) {
        if (block.timestamp > userInfo[_account].poolEndTime) {
            if (userInfo[_account].since > userInfo[_account].poolEndTime) {
                reward = 0;
            } else {
                reward =
                    userInfo[_account].rewardDebt +
                    (((userInfo[_account].poolEndTime -
                        userInfo[_account].since) *
                        userInfo[_account].amount *
                        rewards) / (rewardsDuration * decimals));
            }
        } else {
            reward =
                userInfo[_account].rewardDebt +
                (((block.timestamp - userInfo[_account].since) *
                    userInfo[_account].amount *
                    rewards) / (rewardsDuration * decimals));
        }
    }

    function _totalTOkenStacked(
        uint256 _rewards,
        uint256 _decimal,
        uint256 _totalTokenAmount
    ) internal pure returns (uint256 totalTOkenStacked) {
        totalTOkenStacked = (_decimal * _totalTokenAmount) / _rewards;
    }

    function stakeBalanceOfUser(address _user) external view returns (uint256) {
        return userInfo[_user].amount;
    }

    function currentTime() external view returns (uint256) {
        return block.timestamp;
    }

    function getPoolEndTime(
        address _user
    ) external view returns (UserInfo memory) {
        return userInfo[_user];
    }
}
