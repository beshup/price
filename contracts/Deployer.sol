// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Shares.sol"

contract MainManager {
    
    LTokens token;
    address payable owner;
    bool seasonStarted;
    bool seasonEnded;
    uint256 public constant buyPrice = 0.01 ether;
    uint256 public constant weekPeriod = 7 days;
    uint256 auctionEndDate; // for now, let auctionEndDate be seasonStartDate

    uint256 lastWeekDividendFund;
    uint256 currWeekDividendFund;
    uint256 currWeekStart;

    address[] shareholders;
    mapping (uint256 => uint) public entityToPublicShareAmount;
    mapping (address => uint256) public lastDividendWithdrawn;

    uint[] topEntitiesPastWeek;
    mapping (uint256 => uint) public entityToScorePastWeek;
    
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

    modifier hasSeasonEnded() {
        require(seasonEnded);
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


        if (lastDividendWithdrawn[msg.sender] == address(0x0)) { // not already in 
            shareholders.push(msg.sender);
            lastDividendWithdrawn(msg.sender) = block.timestamp; // set temporary date, when auction end triggered, update
        }

        require(token.balanceOf(address(this), tokenId) > numOfTokens, "Tokens sold out");
        token.transfer(msg.sender, tokenId);
    }

    function startSeason() public payable auctionEnded seasonNotStarted {
        seasonStarted = true;  
        //AMM deployment TODO
    }
    
    // paying dividend per share type, as opposed to all share tyes that msg.sender holds
    function giveDividendPerPlayer(uint256 tokenId) seasonStarted {
        // have dividedn logic w/e   
        // so msg.sender is person who has shares
        // grab list of top 20 players of the last week (let's go by ppg for now) 
        // add up the ppg and assign a fraction of dividend fund based on ppg share of pool for each player
        // grab how many shares of this player there are owned by shareholders
        // grab how many shares of this player msg.sender owns
        // (sender shares per player / total shares per player) x amount reserved for player from dividend fund, send this back
        require(entityToScorePastWeek(tokenId) != 0x0);
        require(lastDividendWithdrawn(msg.sender) < currWeekStart);

        uint sum = 0;
        for (uint i=0; i<topEntitiesPastWeek.length; i++) {
            sum += entityToScorePastWeek(topEntitiesPastWeek[i])
        }
        uint reservedForEntity = (entityToScorePastWeek(tokenId) / sum)*lastWeekDividendFund; 
        
        uint sendAmount = (balanceOf(msg.sender, tokenId) / entityToPublicShareAmount(tokenId))*reservedForEntity;

        lastDividendWithdrawn(msg.sender) = block.timestamp;

        // send back sendAmount
    }

    // function that will trigger end of auction, and set every value in lastDividendWithdrawn to current date
    function endAuction() public auctionOngoing onlyOwner {
        auctionEndDate = block.timestamp

        for (uint i=0; i<shareholders.length; i++) {
            lastDividendWithdrawn(shareholders[i]) = block.timestamp
        }
    }


    function weekTrigger() public onlyOwner {
        // calculate top entities of past week by gripping offchain data
        currWeekStart = block.timestamp

        lastWeekDividendFund = currWeekDividendFund
        currWeekDividendFund = 0
    }

    // ISHAN adds more dividend logic
     
    //function cashOutRunAway() public onlyOwner {
        //selfdestruct(msg.sender);
    //}

    function endSeason() public onlyOwner {
        // turn SFTs into NFTs
    }

    // function for top shareholder to turn to nft
    function retrieveNFT(uint256 tokenId) public hasSeasonEnded {

    }
}



