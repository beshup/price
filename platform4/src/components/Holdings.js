import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import PlayerAsset from './AssetCardItem';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }

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
                <h1>Your Portal</h1>
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
