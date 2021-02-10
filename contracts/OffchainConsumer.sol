// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.4;
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract OffchainConsumer is ChainlinkClient {
    mapping (string => uint256) public playerToPpg;
    address public owner;
    
    address private nba_ORACLE;
    bytes32 private nba_JOBID;
    uint256 private fee;

    constructor() public {
        setPublicChainlinkToken();
        nba_ORACLE = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        nba_JOBID = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
  

    // for now, grabbing top ppg of season, later grabbing top performers only of the past week!

    function requestDividendWorthyEntities() public onlyOwner returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(nba_JOBID, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        
        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        request.add("path", "RAW.ETH.USD.VOLUME24HOUR");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        
        // Sends the request
        // sending LINK is not fun, can we pass in amou
        return sendChainlinkRequestTo(nba_ORACLE, request, fee);
    }
} 