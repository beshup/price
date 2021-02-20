import React, { Component } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import PlayerAsset from './AssetCardItem';
import Web3 from 'web3'
import Loading from './Loading';

require('dotenv').config()

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          userAddress: '',
          deployerContract: null
        };
    }


    async loadBlockchainData() {
        const ABI = [{"inputs":[{"internalType":"uint256","name":"buyPrice","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"inputs":[],"name":"endAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endSeason","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"reqID","type":"bytes32"},{"internalType":"uint256","name":"payout","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"get_buy_price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"entityId","type":"uint256"}],"name":"get_top_shareholder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getPlayerBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getShareOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"request_uri","type":"string"}],"name":"giveDividendPerPlayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"request_uri","type":"string"}],"name":"requestDividendWorthyEntities","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"retrieveNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellAmount","type":"uint256"}],"name":"sellTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startSeason","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"entityId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer_from_backdoor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"weekTrigger","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"entityToPublicShareAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"jobIdMapping","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDividendWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numEntities","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract LTokens","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weekPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        // grab the default account address
        var deployerContract = new window.web3.eth.Contract(ABI, "0xCe715FBcD7719B2e94AE842a6BD8e737A6255f07", {});

        const userAddress = window.ethereum.selectedAddress
        const accounts = await window.web3.eth.getAccounts()
        this.setState({account: accounts[0], deployerContract: deployerContract, userAddress: userAddress})
        
        let sharesHeld = []
        for (var i=0; i<20; i++) {
            sharesHeld.push(await deployerContract.methods.getPlayerBalance(i).call({from:userAddress}))
        }

        fetch("http://hax.hacker.af:5000/grip_league_all_types")
          .then(res => res.json())
          .then(
            (result) => {
                let tempItems = []
                sharesHeld.forEach((playerShares, index) => {
                    if (playerShares > 0) {
                        console.log(tempItems);
                        tempItems.push({"player_data": result[index], "amount": playerShares})
                    }
                })
                this.setState({
                    isLoaded: true,
                    items: tempItems
                })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
    }



    componentDidMount() {
        this.loadBlockchainData()
    }
    
    createPlayerCards() {
        let ret = '';
        fetch('http://hax.hacker.af:5000/grip_league')
        .then(response => response.json())
        .then(data => {

        });
        
        let playerArr = ['a','b','c','d'];
        return playerArr.map((player) => {
            return (
                <PlayerAsset
                    src='https://i.ytimg.com/vi/ZatiWqQjU7M/maxresdefault.jpg'
                    name={player}
                    team="Los Angeles Lakers"
                    position="SF"
                    label='All-Star'
                    path='/services'
                    sharesOwned='10'
                />
            );
        });
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loading></Loading>;
        } else {
            console.log(items);
            let arr = items.map((player) => {
                return (
                    <PlayerAsset
                        src={player.player_data.image}
                        name={player.player_data.name}
                        team={player.player_data.team}
                        position={player.player_data.position}
                        label='All-Star'
                        path='/services'
                        sharesOwned={player.amount}
                        deployerContract={this.state.deployerContract}
                        userAddress={this.state.userAddress}
                        tokenId={player.player_data.token_id}
                    />
                );
            }); 
            return (
                <div className='cards'>
                <h1>Shareholder Portal</h1>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {arr}
                    </ul>
                    </div>
                </div>
                </div>
            );
        }
    }
}

export default Cards;
