// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract LTokens is ERC1155 {
    mapping (uint => string) public playerIdToName;
    mapping (uint => address) public maxOwners;

    constructor() public ERC1155("TEST URI") {
        playerNameToId[0] = "Nikola Jokic";
        playerNameToId[1] = "Karl-Anthony Towns";
        playerNameToId[2] = "Joel Embiid";
        playerNameToId[3] = "Kawhi Leonard";
        playerNameToId[4] = "Kevin Durant";
        playerNameToId[5] = "Stephen Curry";
        playerNameToId[6] = "C.J. McCollum";
        playerNameToId[7] = "Damian Lillard";
        playerNameToId[8] = "Kyrie Irving";
        playerNameToId[9] = "James Harden";
        _mint(msg.sender, playerNameToId[0], 69, "");
        _mint(msg.sender, playerNameToId[1], 69, "");
        _mint(msg.sender, playerNameToId[2], 69, "");
        _mint(msg.sender, playerNameToId[3], 69, "");
        _mint(msg.sender, playerNameToId[4], 69, "");
        _mint(msg.sender, playerNameToId[5], 69, "");
        _mint(msg.sender, playerNameToId[6], 69, "");
        _mint(msg.sender, playerNameToId[7], 69, "");
        _mint(msg.sender, playerNameToId[8], 69, "");
        _mint(msg.sender, playerNameToId[9], 69, "");
    }

    // ISHAN adds max owner calculations during transfer
}
