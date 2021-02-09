// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Shares.sol"

contract MainManager {
    
    LTokens token;
    address payable owner;
    bool seasonStarted;
    uint256 public constant buyPrice = 0.01 ether;
    uint256 auctionEndDate;

    uint256 dividendFund;

    mapping (address => uint256) public lastDividendWithdrawn;
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier auctionOngoing() {
        require(block.timestamp < auctionEndDate);
        _;
    }

    modifier auctionEnded() {
        require(block.timestamp > auctionEnded);
        _;
    }

    modifier seasonNotStarted() {
        require(!seasonNotStarted);
        _;
    }

    modifier hasSeasonStarted() {
        require(seasonStarted);
        _;
    }

    constructor() public {
        owner = msg.sender;
        token = new LTokens();
        auctionEndDate = block.timestamp + 1 days;
        seasonStarted = false;
    }
    
    function buyTokens(uint256 tokenId) public payable auctionOngoing {
        require(msg.value > 0 && msg.value%buyPrice == 0, "Broken funds");
        uint256 numOfTokens = msg.value/buyPrice;

        require(token.balanceOf(address(this), tokenId) > numOfTokens, "Tokens sold out");
        token.transfer(msg.sender, tokenId);
    }

    function startSeason() public payable auctionEnded seasonNotStarted {
        seasonStarted = true;  
        //AMM deployment TODO
    }
    
    function giveDividend(uint256 tokenId) seasonStarted {
        // have dividedn logic w/e     
        
        require((lastDividendWithdrawn[msg.sender] + 7 days) < block.timestamp);
        lastDividendWithdrawn[msg.sender] = block.timestamp;
        // ISHAN adds dividend logic
    }

    // ISHAN adds more dividend logic
     
    //function cashOutRunAway() public onlyOwner {
        //selfdestruct(msg.sender);
    //}
}



