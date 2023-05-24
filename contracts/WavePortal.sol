// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    struct Data {
        uint number;
        bool isAuthorized;
    }

    mapping(address => Data) public userMap;

    constructor() {
        console.log("Yo yo, I'm a smart contract getting initialized! :)");
    }

    function getUserMap(address _addr) public view returns (Data memory) {
        return userMap[_addr];
    }

    function toggleAuthorization(address _addr) public {
        userMap[_addr].isAuthorized = !userMap[_addr].isAuthorized;
    }

    function wave(address _addr) public {
        if (userMap[_addr].isAuthorized) {
            userMap[_addr].number += 1;
            console.log("%s has waved!", msg.sender);
        } else {
            console.log("Unauthorized user cannot wave!");
        }
    }

    function getTotalWaves(address _addr) public view returns (uint256) {
        console.log(
            "We have %d total waves for this address: %s",
            userMap[_addr].number,
            _addr
        );
        return userMap[_addr].number;
    }
}
