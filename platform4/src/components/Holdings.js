import React, { Component } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import PlayerAsset from './AssetCardItem';
import Web3 from 'web3'
import Loading from './Loading';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          account: 'nyeaheh'
        };
    }


    async loadBlockchainData() {
        const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"inputs":[],"name":"buyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endSeason","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"entityToPublicShareAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"reqID","type":"bytes32"},{"internalType":"uint256","name":"payout","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getPlayerBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getShareOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"entityId","type":"uint256"}],"name":"get_top_shareholder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"request_uri","type":"string"}],"name":"giveDividendPerPlayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"jobIdMapping","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDividendWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numEntities","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"request_uri","type":"string"}],"name":"requestDividendWorthyEntities","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"retrieveNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startSeason","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"entityId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer_from_backdoor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"weekPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weekTrigger","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        window.web3 = new Web3(window.ethereum);
        // grab the default account address
        var deployerContract = new window.web3.eth.Contract(ABI, "0x02f9A57dDFE1BED790C78298165c5cDdcc24ee58", {});

        const userAddress = window.ethereum.selectedAddress
        const accounts = await window.web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        
        let sharesHeld = []
        for (var i=0; i<20; i++) {
            sharesHeld.push(deployerContract.methods.getPlayerBalance(i))
        }

        fetch("http://hax.hacker.af:5000/grip_league_all_types")
          .then(res => res.json())
          .then(
            (result) => {
                let tempItems = []
                sharesHeld.forEach((playerShares, index) => {
                    if (playerShares > 0) {
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
        return (
            <div>
              <p>Check out the the console....</p>
              <p>Your account: {this.state.account}</p>
            </div>
          );
        /*
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
                        src={player.image}
                        name={player.name}
                        team={player.team}
                        position={player.position}
                        label='All-Star'
                        path='/services'
                        sharesOwned='10'
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
        */
    }
}

export default Cards;
