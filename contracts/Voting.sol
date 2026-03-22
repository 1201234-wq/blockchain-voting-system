// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(string => uint) public votes;
    string[] public candidates;

    constructor() {
        candidates.push("Alice");
        candidates.push("Bob");
    }

    function vote(string memory candidate) public {
        votes[candidate]++;
    }

    function getVotes(string memory candidate) public view returns (uint) {
        return votes[candidate];
    }

    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }
}