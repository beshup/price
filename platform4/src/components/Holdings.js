import React, { Component } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import PlayerAsset from './AssetCardItem';
import Web3 from 'web3'

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          account: 'nyeaheh',
          deployerContract: null
        };
    }

    async loadBlockchainData() {
        window.web3 = new Web3(window.ethereum);
        // grab the default account address
        var deployerContract = new window.web3.eth.Contract([], window.web3.eth.defaultAccount, {});

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
    
/*
    componentDidMount() {
        fetch("http://hax.hacker.af:5000/grip_league")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
*/
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
            return <div>Loading...</div>;
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
