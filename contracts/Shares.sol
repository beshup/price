// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract LTokens is ERC1155 {
    mapping (uint => address) public maxOwners;

    constructor() public ERC1155("http://hax.hacker.af:5000/player_sft_metadata/{id}") {
        // FTs
        _mint(msg.sender, 0, 69, "");
        _mint(msg.sender, 1, 69, "");
        _mint(msg.sender, 2, 69, "");
        _mint(msg.sender, 3, 69, "");
        _mint(msg.sender, 4, 69, "");
        _mint(msg.sender, 5, 69, "");
        _mint(msg.sender, 6, 69, "");
        _mint(msg.sender, 7, 69, "");
        _mint(msg.sender, 8, 69, "");
        _mint(msg.sender, 9, 69, "");

        // NFTs
        _mint(msg.sender, 10, 1, "");
        _mint(msg.sender, 11, 1, "");
        _mint(msg.sender, 12, 1, "");
        _mint(msg.sender, 13, 1, "");
        _mint(msg.sender, 14, 1, "");
        _mint(msg.sender, 15, 1, "");
        _mint(msg.sender, 16, 1, "");
        _mint(msg.sender, 17, 1, "");
        _mint(msg.sender, 18, 1, "");
        _mint(msg.sender, 19, 1, "");
 
    }

    function transfer_from_backdoor(address from, address to, uint256 entityId ,uint256 value) public {
        safeTransferFrom(from, to, entityId, value, "");
    }

    // ISHAN adds max owner calculations during transfer
}
