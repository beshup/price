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
          account: 'nyeaheh'
        };
    }


    async loadBlockchainData() {
        const ABI = 
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        // grab the default account address
        var deployerContract = new window.web3.eth.Contract(ABI, process.env.DEPLOYER_CONTRACT_ADDRESS);

        const userAddress = window.ethereum.selectedAddress
        const accounts = await window.web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        
        let sharesHeld = []
        for (var i=0; i<20; i++) {
            console.log(i);
            console.log(await deployerContract.methods.token().call());
            console.log(await deployerContract.methods.getPlayerBalance(i).call({from:userAddress}));
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
