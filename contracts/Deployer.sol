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
    
<<<<<<< Updated upstream
    function giveDividend(uint256 tokenId) seasonStarted {
        // have dividedn logic w/e     
=======
    // paying dividend per share type, as opposed to all share tyes that msg.sender holds
    function giveDividendPerPlayer(uint256 tokenId) seasonStarted {
        // have dividedn logic w/e   
        // so msg.sender is person who has shares
        // grab list of top 20 players of the last week (let's go by ppg for now) 
        // add up the ppg and assign a fraction of dividend fund based on ppg share of pool for each player
        // grab how many shares of this player there are owned 
        // grab how many shares of this player msg.sender owns
        // (sender shares per player / total shares per player) x amount reserved for player from dividend fund, send this back

>>>>>>> Stashed changes
        
        require((lastDividendWithdrawn[msg.sender] + 7 days) < block.timestamp);
        lastDividendWithdrawn[msg.sender] = block.timestamp;
        // ISHAN adds dividend logic
<<<<<<< Updated upstream
    }
=======
        // can
    }

    // function that will trigger end of auction, and set every value in lastDividendWithdrawn to current date
    function endAuction() public auctionOngoing onlyOwner {
        auctionEndDate = block.timestamp

        for (uint i=0; i<shareholders.length; i++) {
            lastDividendWithdrawn(shareholders[i]) = block.timestamp
        }
    }


    // need function that calculates and sets dividendFund values every week
    // also sets currWeekStart
    function weekTrigger() public onlyOwner [


        lastWeekDividendFund = currWeekDividendFund
        currWeekDividendFund = 0
    ]
>>>>>>> Stashed changes

    // ISHAN adds more dividend logic
     
    //function cashOutRunAway() public onlyOwner {
        //selfdestruct(msg.sender);
    //}
}



