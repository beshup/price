// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Shares is ERC1155 {
    mapping (string => uint) public playerNameToId;

    constructor() public ERC1155("uri of some sort") {
        _mint(msg.sender, playerNameToId["LeBron James"], 10**18, "");
    }
}