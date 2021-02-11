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
    uint256 public constant numEntities = 10;
    uint256 auctionEndDate; // for now, let auctionEndDate be seasonStartDate

    uint256 lastWeekDividendFund;
    uint256 currWeekDividendFund;
    uint256 currWeekStart;

    address[] shareholders;
    mapping (uint256 => uint) public entityToPublicShareAmount;
    mapping (address => uint256) public lastDividendWithdrawn;

    uint[] topEntitiesPastWeek;
    
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

        // take cut and transfer to owner address
        // log cut in currWeekDividendFund 

        require(token.balanceOf(address(this), tokenId) > numOfTokens, "Tokens sold out");
        token.transfer(msg.sender, tokenId);

        // wait aren' we missing tranferring the valu to us? or no does the value auto get sent to his contract
    }

    function startSeason() public payable auctionEnded seasonNotStarted {
        seasonStarted = true;  
        // for now hardcoded to 69, wil be on bell curve (worst producing and best producing players are rarer)
        for (int i=0; i<numEntities; i++) {
            entityToPublicShareAmount[i] = 69
        }
        //AMM deployment TODO
    }

    // paying dividend per share type, as opposed to all share tyes that msg.sender holds
    function giveDividendPerPlayer(string request_uri) seasonStarted {
        require(lastDividendWithdrawn[msg.sender] < currWeekStart);

        // res is from chainlink 
        // tokenId is entityId
        // balanceOf() is shares_owned
        // entityToPublicShareAmount[token_id] is shares_in_circulation
        // lastWeekDividendFund is dividend_fund

        lastDividendWithdrawn[msg.sender] = block.timestamp;
        requestDividendWorthyEntities(request_uri);

        // send back sendAmount
    }

    
    function transfer_from_backdoor(address from, address to, uint256 entityId ,uint256 value) public {
        uint256 our_cut = 0.05 * value;
        value -= our_cut;
        currWeekDividendFund += 0.70 * our_cut;

        token.transfer_from_backdoor(from, to, entityId, value);
    }
    // ISHAN adds max owner calculations during transfer

    // function that will trigger end of auction, and set every value in lastDividendWithdrawn to current date
    function endAuction() public auctionOngoing onlyOwner {
        auctionEndDate = block.timestamp;

        for (uint i=0; i<shareholders.length; i++) {
            lastDividendWithdrawn[shareholders[i]] = block.timestamp;
        }
    }

    function getPlayerBalance(uint256 tokenId) {
        return token.balanceOf(msg.sender, tokenId);
    }


    function weekTrigger() public onlyOwner {
        currWeekStart = block.timestamp

        lastWeekDividendFund = currWeekDividendFund
        currWeekDividendFund = 0
    }

    function get_top_shareholder(uint256 entityId) public {
        return 0x69696969;
    }

    function getShareOwnership() {
        // hardcoded for now
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
        require(msg.sender == get_top_shareholder(tokenId));
        token.tranfer(get_top_shareholder(tokenId), 1, tokenId);
    }
}

