// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";

contract MyGovernor is Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    constructor(IVotes _token)
        Governor("MyGovernor")
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4)
    {}

    /**
     * @dev Extend the voting delay from the default of 2 days to 1 block.
     * See {Governor-votingDelay}.
     */
    function votingDelay() public pure override returns (uint256) {
        return 1; // 1 block
    }

    /**
     * @dev Extend the voting period from the default of 3 days to 1 week.
     * See {Governor-votingPeriod}.
     */
    function votingPeriod() public pure override returns (uint256) {
        return 45818; // 1 week
    }
  
    /**
     * @dev Remove the proposal threshold.
     * See {Governor-proposalThreshold}.
     */
    function proposalThreshold() public pure override returns (uint256) {
        return 0;
    }

    /**
     * @dev Extend the quorum fraction from the default of 3% to 25%.
     * See {GovernorVotesQuorumFraction-quorum}.
     */
    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }
}