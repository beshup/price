import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import PlayerAsset from './AssetCardItem';

class  Cards extends React.Component {
    getPlayers() {

    }

    createPlayerCards() {
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
            <div className='cards'>
            <h1>Your Portal</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                <ul className='cards__items'>
                    {this.createPlayerCards()}
                </ul>
                </div>
            </div>
            </div>
        );
    }
}

export default Cards;
