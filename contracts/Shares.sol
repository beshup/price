// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract LTokens is ERC1155 {
    mapping (uint => string) public playerNameToId;
    mapping (uint => address) public maxOwners;

    constructor() public ERC1155("TEST URI") {
        playerNameToId[0] = "LeBron James";
        playerNameToId[1] = "Kyle Lowry";
        playerNameToId[2] = "Stephen Curry";
        playerNameToId[3] = "Anthony Davis";
        playerNameToId[4] = "Russell Westbrook";
        _mint(msg.sender, playerNameToId(0), 69, "");
        _mint(msg.sender, playerNameToId(1), 69, "");
        _mint(msg.sender, playerNameToId(2), 69, "");
        _mint(msg.sender, playerNameToId(3), 69, "");
        _mint(msg.sender, playerNameToId(4), 69, "");
    }

    // ISHAN adds max owner calculations during transfer
}
