// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.4;
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract OffchainConsumer is ChainlinkClient {
    //mapping (string => uint256) public playerToPpg;
    mapping (bytes32 => address) public jobIdMapping; 
    address public owner;
    
    address private nba_ORACLE;
    bytes32 private nba_JOBID;
    uint256 private fee;

    constructor() public {
        setPublicChainlinkToken();
        nba_ORACLE = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
  

    // for now, grabbing top performers of season, later grabbing top performers only of the past week!

    function requestDividendWorthyEntities(string request_uri) public onlyOwner returns (bytes32 requestId) {
        bytes32 randomID = bytes32(keccak256(block.timestamp+69));
        Chainlink.Request memory request = buildChainlinkRequest(randomID, address(this), this.fulfill.selector);
        jobIdMapping[randomID] = msg.sender;
         
        // Set the URL to perform the request on
        request.add("get", request_uri);
        request.add("path", "to_send");
        
        return sendChainlinkRequestTo(randomID, request, fee);
    }

     function fulfill(bytes32 _requestId, uint256 payout) public recordChainlinkFulfillment(_requestId)
    {
        require(jobIdMapping[randomID] != 0x0);
        jobIdMapping[randomID].transfer(payout);
        jobIdMapping[randomID] = 0x0;
        //payout to jobIdMapping[randomID]
    }
} 
